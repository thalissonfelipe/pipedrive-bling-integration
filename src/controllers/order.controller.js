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
    },
    async sync(req, res) {
        try {
            logger.info('Running Pipedrive and Bling integration.')
            const response = await ordersService.create();

            const message = response
                ? 'Sincronização realizada! Novos pedidos foram criados.'
                : 'Sincronização realizada! Nenhum pedido foi criado.';

            return res.status(200).send(message);
        } catch (error) {
            logger.error(error);
            return res.status(500).send('Internal Error.');
        }
    }
}
