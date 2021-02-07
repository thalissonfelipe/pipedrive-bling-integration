require('tap').mochaGlobals();
const test = require('tap').test;
const sinon = require('sinon');
const historyController = require('../../src/controllers/history.controller');
const historyRepository = require('../../src/repositories/history.repository');
const logger = require('../../src/utils/log');

const MOCK_HISTORIES = [
    {
        timestamps: [
            '2020-02-03 08:00:00',
            '2020-02-03 09:36:23'
        ]
    }
];

const MOCK_ERROR = {
    name: 'MongoNetworkError',
    message: 'failed to reconnect after 30 attempts with interval 1000 ms',
    errorLabels: ['TransientTransactionError']
};

test('Should return a list of histories', async function(t) {
    historyRepository.find = sinon.stub();
    historyRepository.find.returns(MOCK_HISTORIES);

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await historyController.index(req, res);
    sinon.assert.called(historyRepository.find)
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, MOCK_HISTORIES[0]);
    
    sinon.restore();
    t.end();
});

test('Should return HTTP Status 500 and MongoNetworkError', async function(t) {
    logger.error = sinon.stub();
    
    historyRepository.find = sinon.stub();
    historyRepository.find.throws(MOCK_ERROR);

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);

    await historyController.index(req, res);
    sinon.assert.called(historyRepository.find)
    sinon.assert.calledWith(logger.error, MOCK_ERROR);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.send, 'Internal Error.');

    sinon.restore();
    t.end();
});
