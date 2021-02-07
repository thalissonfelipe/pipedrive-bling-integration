const app = require('./app');
const logger = require('./utils/log');
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => logger.info(`Server listening on port ${PORT}!`));

module.exports = server;
