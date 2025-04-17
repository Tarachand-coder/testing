const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const router = require('./routes/index.route');
const cronJob = require('../src/cronjob/index.js');

require('dotenv').config();
const PORT = process.env.PORT;
app.use(bodyParser.json());

app.use(express.static('public'))

app.use('/', router);

app.listen(PORT, function() {
    console.log(`Listen this project on port ` + PORT + `:`)
});