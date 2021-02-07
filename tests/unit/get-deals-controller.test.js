require('tap').mochaGlobals();
const test = require('tap').test;
const sinon = require('sinon');
const axios = require('axios');
const dealsController = require('../../src/controllers/deals.controller');
const logger = require('../../src/utils/log');

const MOCK_DEALS = {
    success: true,
    data: [
        {
            id: 0,
            person_name: 'mock_name',
            title: 'mock_title',
            value: 0,
            currency: 'mock_currency',
            wonDate: 'mock_date'
        }
    ]
}

test('Should return a list of deals', async t => {
    const axiosStub = sinon.stub(axios, 'get').returns(Promise.resolve({
        status: 200,
        statusText: 'OK',
        data: MOCK_DEALS
    }))

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await dealsController.index(req, res);
    sinon.assert.called(axiosStub)
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, MOCK_DEALS);
    sinon.restore();

    t.end();
});

test('Should return HTTP Status 500', async t => {
    const axiosStub = sinon.stub(axios, 'get').returns(Promise.reject('mock error'));
    logger.error = sinon.stub();

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);

    await dealsController.index(req, res);
    sinon.assert.called(axiosStub)
    sinon.assert.calledWith(logger.error, 'mock error');
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.send, 'Internal Error.');
    sinon.restore();

    t.end();
});
