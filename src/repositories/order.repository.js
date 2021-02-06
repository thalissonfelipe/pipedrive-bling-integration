const Order = require('../models/Order');

module.exports = {
    async find() {
        try {
            const orders = await Order.find({}, {
                _id: 0,
                __v: 0
            });

            return orders;
        } catch (error) {
            throw error;
        }
    },
    async findGrouped() {
        try {
            const orders = await Order.aggregate([{
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$wonDate' } },
                    totalAmount: { $sum: '$value' }
                }
            }, {
                $project: {
                    _id: 0,
                    date: '$_id',
                    totalAmount: 1
                }
            }]);

            return orders;
        } catch (error) {
            throw error;
        }
    },
    async save(orders) {
        try {
            await Order.insertMany(orders);
        } catch (error) {
            throw error;
        }
    }
};
