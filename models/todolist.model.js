const sql = require('./database');

//Constructor
const ToDoList = function(entry)
{
    this.name = entry.name;
};

//Create entry in database
ToDoList.create = function(entry, result)
{
    sql.query("INSERT INTO todo_lists(name) VALUES (?)", [entry.name], function(err, res)
    {
        if(err)
        {
            console.log('Error in saving entry in database: ', err);
            result(err, null);
            return;
        }

        result(null, {id: res.insertId, data: entry});
    });
};

//Get entry by id
ToDoList.get = function(id, result)
{
    sql.query("SELECT * FROM todo_lists WHERE id = " + id, function(err, res)
    {
        if(err)
        {
            console.log('Error in searching entry in database: ', err);
            result(err, null);
            return;
        }

        //Return entry if found
        if(res.length)
        {
            result(null, res[0]);
            return;
        }

        //Return not found
        result({ inner: 'Nie znaleziono wpisu o podanym id.' }, null);
    });
};

//Get all entries
ToDoList.getAll = function(result)
{
    sql.query("SELECT * FROM todo_lists", function(err, res)
    {
        if(err)
        {
            console.log('Error in fetching all users from database: ', err);
            result(err, null);
            return;
        }

        //Return entries
        result(null, res);
    });
};

//Modify entry
ToDoList.modify = function(id, entry, result)
{
    sql.query("UPDATE todo_lists SET name = ? WHERE id = ?", [entry.name, id], function(err, res)
    {
        if(err)
        {
            console.log('Error in updating entry in database: ', err);
            result(err, null);
            return;
        }

        //Return not found
        if(res.affectedRows == 0)
        {
            result({ inner: 'Nie znaleziono wpisu o podanym id.' }, null);
            return;
        }

        //Return success
        result(null, {data: entry});
    });
};

//Remove entry
ToDoList.remove = function(id, result)
{
    sql.query("DELETE FROM todo_lists WHERE id = ?", [id], function(err, res)
    {
        if(err)
        {
            console.log('Error in removing entry from database: ', err);
            result(err, null);
            return;
        }

        //Return not found
        if(res.affectedRows == 0)
        {
            result({ inner: 'Nie znaleziono wpisu o podanym id.' }, null);
            return;
        }

        //Return success
        result(null, res);
    });
};

module.exports = ToDoList;