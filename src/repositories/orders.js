const Order = require('../models/Order');

module.exports = {
    async find() {
        const orders = await Order.find({}, {
            _id: 0,
            __v: 0
        });

        return orders;
    },
    async findFormatted() {
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
            console.log(error);
        }
    },
    async save(orders) {
        try {
            await Order.insertMany(orders);
        } catch (error) {
            console.log(error);
        }
    }
};
