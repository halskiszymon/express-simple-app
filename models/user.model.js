const sql = require('./database');

//Constructor
const User = function(data)
{
    this.email = data.email;
    this.name = data.name;
    this.password = data.password;
}

//Create user in database
User.create = function(data, result)
{
    sql.query("INSERT INTO users(email, name, password) VALUES (?, ?, ?)", [data.email, data.name, data.password], function(err, res)
    {
        if(err)
        {
            console.log('Error in saving user in database: ', err);
            result(err, null);
            return;
        }

        result(null, {id: res.insertId, data: data});
    });
};

//Get user by id
User.get = function(id, result)
{
    sql.query("SELECT * FROM users WHERE id = " + id, function(err, res)
    {
        if(err)
        {
            console.log('Error in searching user in database: ', err);
            result(err, null);
            return;
        }

        //Return user if found
        if(res.length)
        {
            result(null, res[0]);
            return;
        }

        //Return not found
        result({ inner: 'Nie znaleziono użytkownika o podanym id.' }, null);
    });
};

//Get user by email
User.getByEmail = function(email, result)
{
    sql.query("SELECT * FROM users WHERE email = ?", [email], function(err, res)
    {
        if(err)
        {
            console.log('Error in searching user in database: ', err);
            result(err, null);
            return;
        }

        //Return user if found
        if(res.length)
        {
            result(null, res[0]);
            return;
        }

        //Return not found
        result({ inner: 'Nie znaleziono użytkownika o podanym adresie e-mail.' }, null);
    });
};

//Get all users
User.getAll = function(result)
{
    sql.query("SELECT * FROM users", function(err, res)
    {
        if(err)
        {
            console.log('Error in fetching all users from database: ', err);
            result(err, null);
            return;
        }

        //Return users
        result(null, res);
    });
};

//Modify user
User.modify = function(id, data, result)
{
    sql.query("UPDATE uesrs SET email = ?, name = ? WHERE id = ?", [data.email, data.name, id], function(err, res)
    {
        if(err)
        {
            console.log('Error in updating user in database: ', err);
            result(err, null);
            return;
        }

        //Return not found
        if(res.affectedRows == 0)
        {
            result({ inner: 'Nie znaleziono użytkownika o podanym id.' }, null);
            return;
        }

        //Return success
        result(null, {data: entry});
    });
};

//Remove entry
User.remove = function(id, result)
{
    sql.query("DELETE FROM users WHERE id = ?", [id], function(err, res)
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
            result({ inner: 'Nie znaleziono użytkownika o podanym id.' }, null);
            return;
        }

        //Return success
        result(null, res);
    });
};

module.exports = User;