const { getDeals } = require('../utils/utils');

module.exports = {
    async index(req, res) {
        try {
            const { data } = await getDeals();

            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Internal Error.');
        }
    }
}
