const logger = require('../utils/log');
const ordersService = require('../services/order.service');
const historyRepository = require('../repositories/history.repository');

module.exports = {
    async index(req, res) {
        try {
            const response = await ordersService.index();

            return res.status(200).json(response);
        } catch (error) {
            logger.error(error);
            return res.status(500).send('Internal Error.');
        }
    },
    async sync(req, res) {
        try {
            logger.info('Running Pipedrive and Bling integration.')
            await historyRepository.save();
            const response = await ordersService.create();

            const message = response
                ? 'Sync complete! New orders have been created.'
                : 'Sync complete! No orders were created.';

            return res.status(200).send(message);
        } catch (error) {
            logger.error(error);
            return res.status(500).send('Internal Error.');
        }
    }
}
