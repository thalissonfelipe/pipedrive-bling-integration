const axios = require('axios');
const logger = require('../utils/log');
const ordersRepository = require('../repositories/order.repository');
const { toXML, getDifference } = require('../utils/utils');
const { PIPEDRIVE_API_URL, BLING_API_URL } = require('../config/config');

module.exports = {
    async index() {
        const orders = await ordersRepository.findFormatted();

        return orders;
    },
    async create() {
        try {
            const wonDeals = await axios.get(PIPEDRIVE_API_URL);
            const xmlOrders = toXML(wonDeals.data.data);
            
            const promises = xmlOrders.map(xmlOrder => axios.post(`${BLING_API_URL}&xml=${xmlOrder}`));
            const response = await Promise.all(promises);

            // log failures or success
            response.forEach(item => {
                if (item.data.retorno.erros) { // has errors
                    let err = item.data.retorno.erros[0].erro;
                    logger.warn(`Código de erro: ${err.cod}: ${err.msg}`);
                } else {
                    let order = item.data.retorno.pedidos[0].pedido;
                    logger.info(`Pedido com id ${order.idPedido} criado.`);
                }
            });

            const orders = wonDeals.data.data.map(deal => ({
                orderId: deal.id,
                title: deal.title,
                value: deal.value,
                currency: deal.currency,
                wonDate: deal.won_time
            }));

            if (orders) {
                const oldOrders = await ordersRepository.find();
                const ordersToSave = getDifference(oldOrders, orders);
                ordersToSave && ordersRepository.save(ordersToSave);
            }
        } catch (error) {
            logger.error(error);
        }
    }
}
