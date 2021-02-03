const cron = require('node-cron');
const { create } = require('../services/orders');

cron.schedule('*/10 * * * * *', async () => {
    await create();
});
