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
            const axiosArray = xmlOrders.map(xmlOrder => (
                axios({
                    method: 'post',
                    url: `${BLING_API_URL}&xml=${xmlOrder}`
                })
            ));

            axios
                .all(axiosArray)
                .then(axios.spread((...responses) => {
                    responses.forEach(res => {
                        if (res.data.retorno.erros) { // has errors
                            let err = res.data.retorno.erros[0].erro;
                            logger.error(`Code: ${err.cod} - Response: ${err.msg}`);
                        } else {
                            let order = res.data.retorno.pedidos[0].pedido;
                            logger.info(`Pedido com id ${order.idPedido} criado.`);
                        }
                    })
                }))
                .catch(err => logger.error(err))

            const oldOrders = await ordersRepository.find();
            const newOrders = wonDeals.data.data.map(deal => ({
                orderId: deal.id,
                personName: deal.person_name,
                title: deal.title,
                value: deal.value,
                currency: deal.currency,
                wonDate: deal.won_time
            }));

            const ordersToSave = getDifference(oldOrders, newOrders);
            ordersToSave && ordersRepository.save(ordersToSave);
        } catch (error) {
            logger.error(error);
        }
    }
}
