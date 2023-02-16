const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const notesRoute = require('./routes/notes-route');


app.use(notesRoute);









app.listen(5000);