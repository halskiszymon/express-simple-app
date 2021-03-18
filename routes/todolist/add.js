const express = require('express');
const router = express.Router();

router.post('/', function(req, res, body)
{
    let id = req.body.id;
    let name = req.body.name;

    if(name === undefined || name.length < 1 || name.length > 200)
        genereateResult(res, false, 'todolist/add', 'Wartość w polu treść jest niepoprawna.');
});

module.exports = router;