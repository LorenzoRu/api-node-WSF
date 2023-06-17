const request = require("supertest");
const app = require("../app");
const { default: mongoose } = require("mongoose");
const { Task } = require("../bin/models/taskSchem");

describe("Task API endpoints", () => {
  let authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGRkZWMwNmQwMjZkZmE4M2YxMDRmYSIsIm5hbWUiOiJtb25zdXBlcnBzZXVkbyIsImlhdCI6MTY4NzAxOTIwNn0.J_5J2ms2Y--f601diFs5_q9tQxcQDOQiqPslE1aUInc";

  beforeAll(async () => {});

  describe("GET /:user/list", () => {
    test("should return a list of tasks for a user", async () => {
      const response = await request(app)
        .get("/tasks/monsuperpseudo/list")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.statusCode).toBe(200);
    });

    test("should return an error if user is not found", async () => {
      const response = await request(app)
        .get("/tasks/nonexistentuser/list")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.statusCode).toBe(404);
    });
  });

  describe("POST /:user/create", () => {
    test("should create a new task", async () => {
      const response = await request(app)
        .post("/tasks/monsuperpseudo/create")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          task_name: "Task 2",
          description: "Description of Task 1",
        });

      expect(response.statusCode).toBe(201);
    });
  });

  describe("PUT /:user/update/:id", () => {
    test("should update an existing task", async () => {
      const update = await Task.findOne({ task_name: "Task 2" });
      const taskId = update._id.toString();
      const response = await request(app)
        .put(`/tasks/monsuperpseudo/update/${taskId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          task_name: "Updated Task 1",
          description: "Updated Description of Task 1",
          done: true,
        });
      console.log(response);

      expect(response.statusCode).toBe(200);
    });
  });
});
afterAll(() => {
  mongoose.connection.close();
});
