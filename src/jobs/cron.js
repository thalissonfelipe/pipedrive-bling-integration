const cron = require('node-cron');
const logger = require('../utils/log');
const { create } = require('../services/order.service');

/**
 * Cron used to run every day at 08:00 am.
 * 
 * Routine used to perform the integration between pipedrive and bling platforms.
 */
cron.schedule('0 8 * * *', async () => {
    logger.info('Running Pipedrive and Bling integration.');
    await historyRepository.save();
    await create();
});
