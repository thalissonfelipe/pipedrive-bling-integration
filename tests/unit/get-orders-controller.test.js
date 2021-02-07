require('tap').mochaGlobals();
const test = require('tap').test;
const sinon = require('sinon');
const orderController = require('../../src/controllers/order.controller');
const orderService = require('../../src/services/order.service');
const logger = require('../../src/utils/log');

const MOCK_ORDERS = [
    {
        orderId: 0,
        personName: 'mock_person',
        title: 'mock_title',
        value: 0,
        currency: 'mock_currency',
        wonDate: 'mock_date'
    }
];

const MOCK_ERROR = {
    name: 'MongoNetworkError',
    message: 'failed to reconnect after 30 attempts with interval 1000 ms',
    errorLabels: ['TransientTransactionError']
};

test('Should return a list of orders', async function(t) {
    orderService.index = sinon.stub();
    orderService.index.returns(MOCK_ORDERS);

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await orderController.index(req, res);
    sinon.assert.called(orderService.index)
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, MOCK_ORDERS);
    
    sinon.restore();
    t.end();
});

test('Should return HTTP Status 500 and MongoNetworkError', async function(t) {
    logger.error = sinon.stub();

    orderService.index = sinon.stub();
    orderService.index.throws(MOCK_ERROR);

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);

    await orderController.index(req, res);
    sinon.assert.called(orderService.index)
    sinon.assert.calledWith(logger.error, MOCK_ERROR);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.send, 'Internal Error.');

    sinon.restore();
    t.end();
});
