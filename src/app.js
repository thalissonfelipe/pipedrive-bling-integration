require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./routes');
const connection = require('./database/db');

app.use(express.json());
app.use('/', router);

connection
    .then(() => {
        console.log('Connected with MongoDB Atlas!');
        console.log('Starting cron! Running every day at 06:00 A.M.');
        require('./jobs/cron'); // start cron after successful mongodb connection
    })
    .catch(err => console.log(`Error on mongodb connection: ${err}`));


module.exports = app;
