const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] - ${level} - ${message}`;
});

const logger = createLogger({
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY/MM/DD - HH:mm:ss' }),
        myFormat
    ),
    transports: [
        new transports.Console({
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        new transports.File({
            filename: 'log.log',
            handleExceptions: true,
            json: false,
            maxsize: 5242880, // 5MB
            colorize: true
        })
    ],
    exitOnError: false
});

logger.stream = {
    write: message => logger.info(message.replace(/\n$/, ''))
}

module.exports = logger;
