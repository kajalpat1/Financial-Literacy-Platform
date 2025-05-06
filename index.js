
require('dotenv').config(); //allows to create private variables dont want to share

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express(); //app is a variable that is an instance of express
const handle = require('./handlers');
const port = 8000;
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({hello: 'world' }));

app.use(handle.notFound);
app.use(handle.errors);


app.listen(port, console.log(`Server started on port ${port}`)); //start server
//fucntional server, with singular end point and error handle
