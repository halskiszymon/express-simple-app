const express = require('express');
const router = express.Router();

function validateEmail(email)
{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

router.post('/', function(req, res, body)
{
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    let confirm_password = req.body.confirm_password;

    if(email === undefined || email.length == 0 || !validateEmail(email))
        genereateResult(res, false, 'auth/sign-up', 'Wartość w polu e-mail jest niepoprawna.');

    if(name === undefined || name.length < 3 || name.length > 15 || /^[a-zA-ZĘÓĄŚŁŻŹĆŃęóąśłżźćń]{3,}$/.test(name) != true)
        genereateResult(res, false, 'auth/sign-up', 'Wartość w polu imię jest niepoprawna.');

    if(password === undefined || /[A-Z]/.test(password) != true || /[a-z]/.test(password) != true || /[0-9]/.test(password) != true)
        genereateResult(res, false, 'auth/sign-up', 'Hasło musi składać się z minimum 6 liter w tym jedna duża i jedna mała litera oraz jedna cyfra.');

    if(confirm_password === undefined || confirm_password != password)
        genereateResult(res, false, 'auth/sign-up', 'Podane hasła nie są takie same.');
});

module.exports = router;