process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../src/server');
const { createMockHistory, removeAllHistories } = require('./utility');

chai.use(chaiHttp);

describe('REST API Integration Test', () => {
    describe('/GET histories', () => {
        beforeEach((done) => {
            createMockHistory(done);
        });
    
        it('should return a list of histories', (done) => {
            chai.request(server)
                .get('/histories')
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('timestamps');
                    res.body.timestamps.should.be.a('array');
                done();
            });
        });

        afterEach(done => {
            removeAllHistories(done);
        });
    });

    after(done => {
        server.close();
        done();
    });
});
