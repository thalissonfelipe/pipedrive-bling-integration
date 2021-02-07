process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../src/server');
const Order = require('../../src/models/Order');

chai.use(chaiHttp);

describe('REST API Integration Test', () => {
    describe('/GET deals', () => {
        beforeEach((done) => {
            Order.deleteMany({}, err => {
                if (err) return done(err);
                done();
            });
        });
    
        it('should return a list of deals', (done) => {
            chai.request(server)
                .get('/deals')
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
            });
        });
    });

    after(done => {
        server.close();
        done();
    });
});
