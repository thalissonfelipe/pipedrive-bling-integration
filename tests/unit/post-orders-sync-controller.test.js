require('tap').mochaGlobals();
const test = require('tap').test;
const sinon = require('sinon');
const orderController = require('../../src/controllers/order.controller');
const orderService = require('../../src/services/order.service');
const historyRepository = require('../../src/repositories/history.repository');
const logger = require('../../src/utils/log');

const MOCK_ERROR = {
    name: 'MongoNetworkError',
    message: 'failed to reconnect after 30 attempts with interval 1000 ms',
    errorLabels: ['TransientTransactionError']
};

test('Should return HTTP Status 200 and new orders have been created', async t => {
    logger.info = sinon.stub();
    historyRepository.save = sinon.stub();
    historyRepository.save.returns();
    orderService.create = sinon.stub();
    orderService.create.returns(true);

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);

    await orderController.sync(req, res);
    sinon.assert.calledWith(logger.info, 'Running Pipedrive and Bling integration.');
    sinon.assert.called(historyRepository.save);
    sinon.assert.called(orderService.create)
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.send, 'Sync complete! New orders have been created.');

    sinon.restore();
    t.end();
});

test('Should return HTTP Status 200 and no orders were created', async t => {
    logger.info = sinon.stub();
    historyRepository.save = sinon.stub();
    historyRepository.save.returns();
    orderService.create = sinon.stub();
    orderService.create.returns(false);

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);

    await orderController.sync(req, res);
    sinon.assert.calledWith(logger.info, 'Running Pipedrive and Bling integration.');
    sinon.assert.called(historyRepository.save);
    sinon.assert.called(orderService.create)
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.send, 'Sync complete! No orders were created.');

    sinon.restore();
    t.end();
});

test('Should return HTTP Status 500 and MongoNetworkError', async t => {
    logger.info = sinon.stub();
    logger.error = sinon.stub();

    orderService.create = sinon.stub();
    orderService.create.throws(MOCK_ERROR);

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);

    await orderController.sync(req, res);
    sinon.assert.calledWith(logger.info, 'Running Pipedrive and Bling integration.');
    sinon.assert.called(orderService.create)
    sinon.assert.calledWith(logger.error, MOCK_ERROR);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.send, 'Internal Error.');

    sinon.restore();
    t.end();
});
