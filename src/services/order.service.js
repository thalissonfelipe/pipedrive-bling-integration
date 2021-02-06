const axios = require('axios');
const logger = require('../utils/log');
const ordersRepository = require('../repositories/order.repository');
const { toXML, getDifference } = require('../utils/utils');
const { PIPEDRIVE_API_URL, BLING_API_URL } = require('../config/config');


const getOrders = async () => {
    const wonDeals = await axios.get(PIPEDRIVE_API_URL);
    const xmlOrders = toXML(wonDeals.data.data);
    const axiosArray = xmlOrders.map(xmlOrder => (
        axios({
            method: 'post',
            url: `${BLING_API_URL}&xml=${xmlOrder}`
        })
    ));
    const responses = await Promise.all(axiosArray);
    
    return [wonDeals, responses];
};

const logResponses = responses => {
    let sync = false;

    responses.forEach(res => {
        if (res.data.retorno.erros) {
            let err = res.data.retorno.erros[0].erro;
            logger.error(`Code: ${err.cod} - Response: ${err.msg}`);
        } else {
            sync = true;
            let order = res.data.retorno.pedidos[0].pedido;
            logger.info(`Pedido com id ${order.idPedido} criado.`);
        }
    });
    
    return sync;
};

const saveNewOrders = async orders => {
    const oldOrders = await ordersRepository.find();
    const newOrders = orders.data.data.map(deal => ({
        orderId: deal.id,
        personName: deal.person_name,
        title: deal.title,
        value: deal.value,
        currency: deal.currency,
        wonDate: deal.won_time
    }));

    const ordersToSave = getDifference(oldOrders, newOrders);
    ordersToSave && (await ordersRepository.save(ordersToSave));
};

module.exports = {
    async index() {
        const orders = await ordersRepository.findGrouped();

        return orders;
    },
    async create() {
        try {
            // flag used to check if sync was successful
            // default false
            let sync = false;

            const [orders, responses] = await getOrders();

            sync = logResponses(responses);

            saveNewOrders(orders);

            return sync;
        } catch (error) {
            throw error;
        }
    }
}
