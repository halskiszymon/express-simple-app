require('dotenv').config({ path: '.env' });
const app = require('./app');

app.listen(process.env.SERVER_PORT, function()
{
    console.log('Listening on ' + app.get('port') + '.');
});