process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../app');

const request = supertest(app);
const { seedDB } = require('../seed/seed');
const testData = require('../seed/testData');

let userDocs;
let journeyDocs;

describe('project_phase_test', () => {
  beforeEach(() => seedDB(testData).then((docs) => {
    [userDocs, journeyDocs] = docs;
  }));
  after(() => mongoose.disconnect());
  // error handles a random route-------------------------
  describe('404 random route', () => {
    it('tests a random page', () => request
      .get('/api/userslololo')
      .expect(404)
      .then((res) => {
        expect(res.body.message).to.equal('Page not found');
      }));
  });
  // Users --------------------------------------------
  describe('/api/users', () => {
    it('GET responds with all users', () => request
      .get('/api/users')
      .expect(200)
      .then((res) => {
        const { users } = res.body;
        expect(users.length).to.equal(4);
        expect(users[0]).to.include.keys(
          'username',
          'email',
          'avatar',
          'xp',
          'achievements',
        );
      }));
    it('GET user by username', () => request
      .get(`/api/users/${userDocs[3].email}`)
      .expect(200)
      .then((res) => {
        const { user } = res.body;
        expect(user).to.include.keys(
          'username',
          'email',
          'avatar',
          'xp',
          'achievements',
          '_id',
          '__v',
        );
        expect(user._id).to.equal(`${userDocs[3]._id}`);
      }));
    it('404 when username not in database', () => request
      .get('/api/users/notjamie')
      .expect(404)
      .then((res) => {
        expect(res.body.message).to.equal('Page not found');
      }));
    it('GET journeys by user mongoID', () => request
      .get(`/api/users/${userDocs[1]._id}/journeys`)
      .expect(200)
      .then((res) => {
        const { journeys } = res.body;
        expect(journeys.length).to.equal(2);
        expect(journeys[0]).to.include.keys(
          'route',
          'mode',
          'belongs_to',
          '_id',
          '__v',
        );
        expect(journeys[0].belongs_to).to.equal(`${userDocs[1]._id}`);
      }));
    it('404 when passed a wrong mongo id', () => request
      .get(`/api/users/${journeyDocs[3]._id}/journeys`)
      .expect(404)
      .then((res) => {
        expect(res.body.message).to.equal('Page not found');
      }));
    it('404 when passed a random non-id', () => request
      .get('/api/users/jamie/journeys')
      .expect(404)
      .then((res) => {
        expect(res.body.message).to.equal('Page not found');
      }));
    it('POST user', () => request
      .post('/api/users')
      .send({
        username: 'ant',
        email: 'ant@antman.com',
        avatar:
          'https://images.halloweencostumes.com/products/28771/1-1/child-deluxe-antman-costume.jpg',
      })
      .expect(201)
      .then((res) => {
        const user = res.body.newUser;
        expect(user).to.include.keys(
          'username',
          'email',
          'avatar',
          'xp',
          'achievements',
          '_id',
          '__v',
        );
        expect(user.username).to.equal('ant');
      }));
    it('POST does not work for incorrect info passed', () => request
      .post('/api/users')
      .send({
        username: '',
        email: 4656,
        avartar: 'notanavatar',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).to.equal('Bad request');
      }));
    it('POST does not work for incorrect info missing', () => request
      .post('/api/users')
      .send({})
      .expect(400)
      .then((res) => {
        expect(res.body.message).to.equal('Bad request');
      }));
  });
  // Journeys --------------------------------------------
  describe('/api/journeys', () => {
    it('GET responds with all journeys', () => request
      .get('/api/journeys')
      .expect(200)
      .then((res) => {
        const { journeys } = res.body;
        expect(journeys[0]).to.include.keys(
          'route',
          'mode',
          'belongs_to',
        );
        expect(journeys.length).to.equal(6);
      }));
    it('GET journey by journey ID', () => request
      .get(`/api/journeys/${journeyDocs[2]._id}`)
      .expect(200)
      .then((res) => {
        const { journey } = res.body;
        expect(journey).to.include.keys(
          'route',
          'mode',
          'belongs_to',
          '_id',
          '__v',
        );
        expect(journey._id).to.equal(`${journeyDocs[2]._id}`);
      }));
    it('404 when passed an incorrect mongo id', () => request
      .get(`/api/journeys/${userDocs[1]._id}`)
      .expect(404)
      .then((res) => {
        expect(res.body.message).to.equal('Page not found');
      }));
    it('404 when passed an incorrect mongo id', () => request
      .get('/api/journeys/vel')
      .expect(404)
      .then((res) => {
        expect(res.body.message).to.equal('Page not found');
      }));
    it('POST new journey', () => request
      .post('/api/journeys')
      .send({
        route: [{ "lat": 53.4803217335176, "long": -2.28676869963685, "time": 1532959126826 }, { "lat": 53.486177, "long": -2.239966, "time": 1532959273863 }],
        mode: 'car-hybrid',
        belongs_to: `${userDocs[2]._id}`,
      })
      .expect(201)
      .then((res) => {
        const { newJourney } = res.body;
        expect(newJourney).to.include.keys(
          'route',
          'mode',
          'belongs_to',
          '_id',
          '__v',
        );
        expect(newJourney.belongs_to).to.equal(`${userDocs[2]._id}`);
      }));
  });
  it('400 with missing info', () => request
    .post('/api/journeys')
    .send({})
    .expect(400)
    .then((res) => {
      expect(res.body.message).to.equal('Bad request');
    }));
  it('400 with incorrect info', () => request
    .post('/api/journeys')
    .send({
      route: 45678,
      mode: 'crocodile',
      start_time: 62772,
      end_time: 12,
      belongs_to: 'jeff',
    })
    .expect(400)
    .then((res) => {
      expect(res.body.message).to.equal('Bad request');
    }));
});
