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
      .get(`/api/users/${userDocs[3].username}`)
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
    it('GET journeys by user mongoID', () => request
      .get(`/api/users/${userDocs[1]._id}/journeys`)
      .expect(200)
      .then((res) => {
        const { journeys } = res.body;
        expect(journeys.length).to.equal(2);
        expect(journeys[0]).to.include.keys(
          'route',
          'mode',
          'start_time',
          'end_time',
          'belongs_to',
          '_id',
          '__v',
        );
        expect(journeys[0].belongs_to).to.equal(`${userDocs[1]._id}`);
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
          'start_time',
          'end_time',
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
          'start_time',
          'end_time',
          'belongs_to',
          '_id',
          '__v',
        );
        expect(journey._id).to.equal(`${journeyDocs[2]._id}`);
      }));
  });
});
