const Order = require('../../src/models/Order');
const History = require('../../src/models/History');


const createMockOrder = async (value, wonDate, done) => (
    Order.create({ // add mock data
        orderId: 0,
        personName: 'mock_person',
        title: 'mock_title',
        value,
        currency: 'mock_currency',
        wonDate
    }, err => {
        if (err) return done(err);
        done();
    })
);

const removeAllOrders = async done => (
    Order.deleteMany({}, err => {
        if (err) return done(err);
        done();
    })
);

const createMockHistory = async done => {
    const history = new History();
    history.save();
    done();
};

const removeAllHistories = async done => (
    History.deleteMany({}, err => {
        if (err) return done(err);
        done();
    })
);

module.exports = {
    createMockOrder,
    removeAllOrders,
    createMockHistory,
    removeAllHistories
};
