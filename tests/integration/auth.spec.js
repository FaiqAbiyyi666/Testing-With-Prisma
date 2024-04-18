const { token } = require("morgan");
const app = require("../../app");
const request = require("supertest");

describe("test POST /api/v1/auth/login endpoint", () => {
  const validUser = {
    name: "usertest2",
    email: "usertest2@mail.com",
    password: "password123",
    token: "kelompok3",
  };

  const invalidUser = {
    name: "user test666",
    email: "usertest777@mail.com",
    password: "password123456",
    token: "kelompok666",
  };

  test("test email yang tidak terdaftar -> error", async () => {
    try {
      let { statusCode, body } = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: invalidUser.email, password: invalidUser.password });

      expect(statusCode).toBe(400);
    } catch (err) {
      expect(err).toBe("Email tidak terdaftar");
    }
  });

  test("tes email yang terdaftar, password tidak sesuai -> error", async () => {
    try {
      let { statusCode, body } = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: validUser.email, password: invalidUser.password });

      expect(statusCode).toBe(400);
    } catch (err) {
      expect(err).toBe("password yang digunakan tidak sesuai");
    }
  });

  test("tes email dan password yang sesuai -> sukses", async () => {
    try {
      let { statusCode, body } = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: validUser.email,
          password: validUser.password,
        });

      expect(statusCode).toBe(201);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("data");
      expect(body.data).toHaveProperty("id");
      expect(body.data).toHaveProperty("name");
      expect(body.data).toHaveProperty("email");
      expect(body.data).toHaveProperty("token");
      expect(body.data.id).toBe(validUser.id);
      expect(body.data.name).toBe(validUser.name);
      expect(body.data.email).toBe(validUser.email);
      expect(body.data.token).toBe(validUser.token);
    } catch (err) {
      expect(err).toBe("error");
    }
  });
});
