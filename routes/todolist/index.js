const express = require('express');
const router = express.Router();
const ToDoList = require('../../models/todolist.model');

//Function for getting all entries
router.get('/', function(req, res)
{
    ToDoList.getAll(function(err, data)
    {
        if(err)
            res.status(500).send({message: err.message });
        else
            generateResult(res, true, 'todolist/show', 'Zapytanie zrealizowane.', data);
    });
});

//Function for get entry by id
router.get('/:id', function(req, res)
{
    let id = req.params.id;

    if(id === undefined || isNaN(id))
    {
        generateResult(res, false, 'todolist/show', 'Wartość w polu id jest niepoprawna.')
        return;
    }

    ToDoList.get(id, function(err, data)
    {
        if(err)
            if(err.inner !== undefined)
                generateResult(res, false, 'todolist/show', err.inner);
            else
                res.status(500).send({message: err.message });
        else
            generateResult(res, true, 'todolist/show', 'Zapytanie zrealizowane.', data);
    });
});

//Function for adding new entry
router.post('/', function(req, res)
{
    let name = req.body.name;

    if(name === undefined || name.length < 1 || name.length > 200)
    {
        generateResult(res, false, 'todolist/add', 'Wartość w polu treść jest niepoprawna.');
        return;
    }

    const entry = new ToDoList({
        name: name
    });

    ToDoList.create(entry, function(err, data)
    {
        if(err)
            res.status(500).send({message: err.message });
        else
            generateResult(res, true, 'todolist/add', 'Wpis został dodany do bazy danych.', data);
    });
});

//Function for updating entry by id
router.put('/:id', function(req, res)
{
    let id = req.params.id;
    let name = req.body.name;

    if(id === undefined || isNaN(id))
    {
        generateResult(res, false, 'todolist/modify', 'Wartość w polu id jest niepoprawna.')
        return;
    }

    if(name === undefined || name.length < 1 || name.length > 200)
    {
        generateResult(res, false, 'todolist/modify', 'Wartość w polu treść jest niepoprawna.');
        return;
    }

    const entry = new ToDoList({
        name: name
    });

    ToDoList.modify(id, entry, function(err, data)
    {
        if(err)
            if(err.inner !== undefined)
                generateResult(res, false, 'todolist/modify', err.inner);
            else
                res.status(500).send({message: err.message });
        else
            generateResult(res, true, 'todolist/modify', 'Wpis został zmodyfikowany.', data);
    });
});

//Function for deleting entry by id
router.delete('/:id', function(req, res)
{
    let id = req.params.id;
    let name = req.body.name;

    if(id === undefined || isNaN(id))
    {
        generateResult(res, false, 'todolist/modify', 'Wartość w polu id jest niepoprawna.')
        return;
    }

    if(name === undefined || name.length < 1 || name.length > 200)
    {
        generateResult(res, false, 'todolist/modify', 'Wartość w polu treść jest niepoprawna.');
        return;
    }

    ToDoList.remove(id, function(err, data)
    {
        if(err)
            if(err.inner !== undefined)
                generateResult(res, false, 'todolist/remove', err.inner);
            else
                res.status(500).send({message: err.message });
        else
            generateResult(res, true, 'todolist/remove', 'Wpis został usunięty.', data);
    });
});

module.exports = router;