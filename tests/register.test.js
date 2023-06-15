const request = require("supertest");
const app = require("../app");
const { faker } = require("@faker-js/faker");
const { default: mongoose } = require("mongoose");

describe("POST auth/register", () => {
  test("Succes register", () => {
    return request(app)
      .post("/auth/register")
      .send({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
      .then((res) => {
        console.log(res.body);
        expect(res.statusCode).toBe(201);
      });
  });
  test("Fail register, missing password", () => {
    return request(app)
      .post("/auth/register")
      .send({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: "",
      })
      .then((res) => {
        console.log(res.body);
        expect(res.statusCode).toBe(422
);
      });
  });
  test("Fail register, missing username", () => {
    return request(app)
      .post("/auth/register")
      .send({
        name: "",
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
      .then((res) => {
        console.log(res.body);
        expect(res.statusCode).toBe(422);
      });
  });
  test("Fail register, missing email", () => {
    return request(app)
      .post("/auth/register")
      .send({
        name: faker.internet.userName(),
        email: "",
        password: faker.internet.password(),
      })
      .then((res) => {
        console.log(res.body);
        expect(res.statusCode).toBe(422);
      });
  });
  afterAll(() => {
    mongoose.connection.close();
  });
});
