const axios = require('axios');
const { PIPEDRIVE_API_URL } = require('../config/config');

module.exports = {
    async index(req, res) {
        try {
            const response = await axios.get(PIPEDRIVE_API_URL);

            return res.status(200).json(response.data);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Internal Error.');
        }
    }
}
