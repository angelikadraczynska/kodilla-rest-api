const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConcertOne = new Concert({
      performer: 'John Doe',
      genre: 'Rock',
      price: 32,
      day: 1,
      image: 'example',
      tickets: 0,
      _id: '5d9f1140f10a81216cfd4408'
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      performer: 'Gigi Doe',
      genre: 'Pop',
      price: 21,
      day: 2,
      image: 'example',
      tickets: 0,
      _id: '5d9f1159f81ce8d1ef2bee48'
    });
    await testConcertTwo.save();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/:id should return one concert by :id ', async () => {
    const res = await request(server).get(
      '/api/concerts/5d9f1140f10a81216cfd4408'
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  after(async () => {
    await Concert.deleteMany();
  });
});
