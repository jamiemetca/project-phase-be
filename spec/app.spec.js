process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest")(app);
const { expect } = require("chai");
const { seedDB } = require("../seed/seed");
const testData = require("../seed/testData");
const mongoose = require("mongoose");

let userDocs;
let journeyDocs;

describe("project_phase_test", () => {
  beforeEach(() => {
    return seedDB(testData).then(docs => {
      [userDocs, journeyDocs] = docs;
    });
  });
  after(() => {
    return mongoose.disconnect();
  });
  // users
  describe("/api/users", () => {
    it("GET responds with all users", () => {
      return request
        .get("/api/users")
        .expect(200)
        .then(res => {
          const users = res.body.users;
          expect(users.length).to.equal(4);
          expect(users[0]).to.include.keys(
            "username",
            "email",
            "avatar",
            "xp",
            "achievements"
          );
        });
    });
    it("GET user by username", () => {
      return request
        .get(`/api/users/${userDocs[3].username}`)
        .expect(200)
        .then(res => {
          const user = res.body.user;
          expect(user).to.include.keys(
            "username",
            "email",
            "avatar",
            "xp",
            "achievements",
            "_id",
            "__v"
          );
          expect(user._id).to.equal(`${userDocs[3]._id}`);
        });
    });
    it("POST user", () => {
      return request
        .post("/api/users")
        .send({
          username: "ant",
          email: "ant@antman.com",
          avatar:
            "https://images.halloweencostumes.com/products/28771/1-1/child-deluxe-antman-costume.jpg"
        })
        .expect(201)
        .then(res => {
          const user = res.body.newUser;
          expect(user).to.include.keys(
            "username",
            "email",
            "avatar",
            "xp",
            "achievements",
            "_id",
            "__v"
          );
          expect(user.username).to.equal("ant");
        });
    });
  });
});
