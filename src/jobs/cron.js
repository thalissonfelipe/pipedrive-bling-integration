const cron = require('node-cron');
const logger = require('../utils/log');
const { create } = require('../services/order.service');

cron.schedule('0 8 * * *', async () => {
    logger.info('Running Pipedrive and Bling integration.');
    await create();
});
