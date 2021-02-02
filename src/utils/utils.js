const axios = require('axios');
const { PIPEDRIVE_API_URL } = require('../config/config');

async function getDeals() {
    const response = await axios.get(PIPEDRIVE_API_URL);
    return response;
}

module.exports = { getDeals };
