const logger = require('../utils/log');
const ordersService = require('../services/order.service');

module.exports = {
    async index(req, res) {
        try {
            const response = await ordersService.index();

            return res.status(200).json(response);
        } catch (error) {
            logger.error(error);
            return res.status(500).send('Internal Error.');
        }
    }
}
