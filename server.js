const app = require('./app');

app.set('port', 3000);

const server = app.listen(app.get('port'), function()
{
    console.log('Listening on ' + app.get('port') + '.');
});