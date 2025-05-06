const express = require('express');
const app = express(); //app is a variable that is an instance of express
const handle = require('./handlers');
const port = 8000;

app.get('/', (req, res) => res.json({hello: 'world' }));

app.use(handle.notFound);
app.use(handle.errors);

app.listen(port, console.log(`Server started on port ${port}`)); //start server
//fucntional server, with singular end point and error handle
