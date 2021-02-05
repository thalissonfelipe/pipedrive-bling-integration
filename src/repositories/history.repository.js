const History = require('../models/History');
const logger = require('../utils/log');

module.exports = {
    async save() {
        try {
            const history = new History();
            await history.save();
        } catch (error) {
            logger.error(error);
        }
    },
    async find() {
        try {
            const histories = await History.aggregate([{
                $project: {
                    _id: 0,
                    date: {
                        $dateToString: {
                            format: '%Y-%m-%d %H:%M:%S',
                            date: '$timestamp',
                            timezone: 'America/Fortaleza'
                        }
                    }
                }
            }, {
                $group: {
                    _id: 0,
                    timestamps: {
                        $push: '$date'
                    }
                }
            }, {
                $project: {
                    _id: 0,
                    timestamps: 1
                }
            }])

            return histories;
        } catch (error) {
            logger.error(error);
        }
    }
}