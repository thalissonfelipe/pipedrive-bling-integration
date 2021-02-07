process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const server = require('../../src/server');
const { createMockOrder, removeAllOrders } = require('./utility');

chai.use(chaiHttp);

describe('REST API Integration Test', () => {
    describe('/GET orders', () => {
        beforeEach(done => {
            createMockOrder(1000, Date.now(), done)
        });
    
        it('should return a list of orders', done => {
            chai.request(server)
                .get('/orders')
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].date.should.be.a('string');
                    res.body[0].totalAmount.should.be.a('number');
                    expect(res.body[0].totalAmount).to.equals(1000);
                done();
            });
        });

        afterEach(done => {
            removeAllOrders(done);
        });
    });

    after(done => {
        server.close();
        done();
    });
});
