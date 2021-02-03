const ordersService = require('../services/orders');

module.exports = {
    async index(req, res) {
        try {
            const response = await ordersService.index();

            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Internal Error.');
        }
    }
}
