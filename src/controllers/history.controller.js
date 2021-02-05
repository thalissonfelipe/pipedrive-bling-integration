const logger = require('../utils/log');
const historyRepository = require('../repositories/history.repository');

module.exports = {
    async index(req, res) {
        try {
            const response = await historyRepository.find();

            return res.status(200).json(response[0]);
        } catch (error) {
            logger.error(error);
            return res.status(500).send('Internal Error.');
        }
    }
}
