const cron = require('node-cron');
const logger = require('../utils/log');
const { create } = require('../services/order.service');
const historyRepository = require('../repositories/history.repository');

/**
 * Cron used to run every day at 08:00 am.
 * 
 * Routine used to perform the integration between pipedrive and bling platforms.
 */
cron.schedule('0 8 * * *', async () => {
    try {
        logger.info('Running Pipedrive and Bling integration.');
        await historyRepository.save();
        const response = await create();
        const message = response
            ? 'Sync complete! New orders have been created.'
            : 'Sync complete! No orders were created.';
        logger.info(message);
    } catch (error) {
        logger.error(`Error on cron execution: ${error}`);
    }
});
