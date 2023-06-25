'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const locum_routes = require('./routes/locum_routes');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use('/api', locum_routes.routes);



app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));