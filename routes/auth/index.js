const express = require('express');
const router = express.Router();
const User = require('../../models/user.model');
const bcrypt = require('bcrypt');

function validateEmail(email)
{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Function for sign-up
router.post('/sign-up', function(req, res)
{
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    let confirm_password = req.body.confirm_password;

    if(email === undefined || email.length == 0 || !validateEmail(email))
    {
        generateResult(res, false, 'auth/sign-up', 'Wartość w polu e-mail jest niepoprawna.');
        return;
    }

    if(name === undefined || name.length < 3 || name.length > 15 || /^[a-zA-ZĘÓĄŚŁŻŹĆŃęóąśłżźćń]{3,}$/.test(name) != true)
    {
        generateResult(res, false, 'auth/sign-up', 'Wartość w polu imię jest niepoprawna.');
        return;
    }

    if(password === undefined || /[A-Z]/.test(password) != true || /[a-z]/.test(password) != true || /[0-9]/.test(password) != true)
    {
        generateResult(res, false, 'auth/sign-up', 'Hasło musi składać się z minimum 6 liter w tym jedna duża i jedna mała litera oraz jedna cyfra.');
        return;
    }

    if(confirm_password === undefined || confirm_password != password)
    {
        generateResult(res, false, 'auth/sign-up', 'Podane hasła nie są takie same.');
        return;
    }

    let found = true;
    User.getByEmail(email, function (err, data)
    {
        if(err)
            if(err.inner !== undefined)
                found = false;
            else
                res.status(500).send({message: err.message });

        if(found)
        {
            generateResult(res, false, 'auth/sign-up', 'W systemie istnieje już zarejestrowany użytkownik o podanym adresie e-mail.');
            return;
        }

        bcrypt.hash(password, 10, function(err, hash)
        {
            const newuser = new User(
            {
                email: email,
                name: name,
                password: hash
            });

            User.create(newuser, function(err, data)
            {
                if(err)
                    res.status(500).send({message: err.message });
                else
                    generateResult(res, true, 'auth/sign-up', 'Zostałeś pomyślnie zarejestrowany.', data);
            });
        });
    });
});

//Function for sign-in
router.post('/sign-in', function(req, res)
{
    let email = req.body.email;
    let password = req.body.password;

    if(email === undefined || email.length == 0 || !validateEmail(email))
    {
        generateResult(res, false, 'auth/sign-up', 'Wartość w polu e-mail jest niepoprawna.');
        return;
    }

    if(password === undefined || password.length == 0)
    {
        generateResult(res, false, 'auth/sign-up', 'Wartość w polu hasło jest niepoprawna.');
        return;
    }

    User.getByEmail(email, function (err, data)
    {
        if(err)
            if(err.inner !== undefined)
            {
                generateResult(res, false, 'auth/sign-in', 'Podano nieprawidłowy e-mail i/lub hasło.');
                return;
            }
            else
                res.status(500).send({message: err.message });

        bcrypt.compare(password, data.password, function(err, result)
        {
            if(!result)
            {
                generateResult(res, false, 'auth/sign-in', 'Podano nieprawidłowy e-mail i/lub hasło.');
                return;
            }

            generateResult(res, true, 'auth/sign-in', 'Zostałeś pomyślnie zalogowany.', data);
        });
    });
});


module.exports = router;