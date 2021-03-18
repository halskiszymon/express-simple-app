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
    let password = req.body.password;

    if(email === undefined || email.length == 0 || !validateEmail(email))
        genereateResult(res, false, 'auth/sign-up', 'Wartość w polu e-mail jest niepoprawna.');

    if(password === undefined || password.length == 0)
        genereateResult(res, false, 'auth/sign-up', 'Wartość w polu hasło jest niepoprawna.');
});

module.exports = router;