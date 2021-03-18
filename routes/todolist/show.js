const express = require('express');
const router = express.Router();

router.get('/', function(req, res, body)
{
    let data;
    genereateResult(res, true, "todolist/show", "Zapytanie zrealizowane.", data);
});

module.exports = router;