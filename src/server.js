const app = require('./app');
const logger = require('./utils/log');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => logger.info(`Server listening on port ${PORT}!`));
