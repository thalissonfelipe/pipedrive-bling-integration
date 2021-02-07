require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const app = express();
const router = require('./routes');
const connection = require('./database/db');
const logger = require('./utils/log');

app.use(express.json());
if (process.env.NODE_ENV != 'test') {
    app.use(morgan('combined', { stream: logger.stream }));
}
app.use('/', router);

connection
    .then(() => {
        logger.info('Connected with MongoDB Atlas!');
        logger.info('Starting cron! Running every day at 08:00 AM.');
        require('./jobs/cron'); // start cron after a successful mongodb connection
    })
    .catch(err => logger.error(`Error on mongodb connection: ${err}`));


module.exports = app;
