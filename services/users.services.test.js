const request = require("supertest");
//const assert = require("chai").assert;
const { expect } = require("chai");
//const express = require("express");
const app = require("../server");
const { User } = require("../models");
const { UsersRepo } = require("../repository");
const { generateJWT, encryptPassword } = require("../utils/common_utils");

describe("User Services", () => {
  let user;
  let token;

  beforeEach(async () => {
    const password = "1234567";
    const encryptedPassword = await encryptPassword(password);

    user = await UsersRepo.createUser({
      name: "user1",
      gender: "Male",
      email: "user1@gmail.com",
      password: encryptedPassword,
      active: true,
    });

    token = generateJWT(user._id);
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  describe("GET /user", () => {
    it("should return all users", async () => {
      const res = await request(app)
        .get("/user")
        .set("Authorization", `Bearer ${token}`)
        .set("api-key", "763db502a8e8f06c79481f63ed3db8b8");

      //console.log(user._id.toString());

      // assert.strictEqual(res.status, 200);
      // assert.strictEqual(res.body.success, true);
      // assert.strictEqual(res.body.data.data.length, 1);
      // assert.strictEqual(res.body.data.data[0]._id, user._id.toString());
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.data.data.length).to.equal(1);
      expect(res.body.data.data[0]._id).to.equal(user._id.toString());
    });
  });

  // describe("POST /user/register", () => {
  //   it("should create a new user", async () => {
  //     const res = await request(app).post("/users/register").send({
  //       name: "Jane Doe",
  //       gender: "female",
  //       email: "janedoe@example.com",
  //       password: "password123",
  //       active: true,
  //     });

  //     expect(res.status).toBe(201);
  //     expect(res.body.success).toBe(true);
  //     expect(res.body.data.name).toBe("Jane Doe");
  //     expect(res.body.data.email).toBe("janedoe@example.com");
  //     expect(res.body.data.active).toBe(true);
  //     expect(res.body.data.gender).toBe("female");
  //     expect(res.body.data.postscount).toBe(0);
  //     expect(res.body.data.token).toBeDefined();
  //   });
  // });

  // describe("POST /user/login", () => {
  //   it("should login a user with correct credentials", async () => {
  //     const res = await request(app).post("/users/login").send({
  //       email: "johndoe@example.com",
  //       password: "password123",
  //     });

  //     expect(res.status).toBe(200);
  //     expect(res.body.success).toBe(true);
  //     expect(res.body.data.name).toBe("John Doe");
  //     expect(res.body.data.email).toBe("johndoe@example.com");
  //     expect(res.body.data.active).toBe(true);
  //     expect(res.body.data.gender).toBe("male");
  //     expect(res.body.data.postscount).toBe(0);
  //     expect(res.body.data.token).toBeDefined();
  //   });

  //   it("should not login a user with incorrect email", async () => {
  //     const res = await request(app).post("/users/login").send({
  //       email: "janedoe@example.com",
  //       password: "password123",
  //     });

  //     expect(res.status).toBe(404);
  //     expect(res.body.success).toBe(false);
  //     expect(res.body.message).toBe("User not found");
  //   });

  //   it("should not login a user with incorrect password", async () => {
  //     const res = await request(app).post("/users/login").send({
  //       email: "johndoe@example.com",
  //       password: "wrongpassword",
  //     });

  //     expect(res.status).toBe(401);
  //     expect(res.body.success).toBe(false);
  //     expect(res.body.message).toBe("Authentication failed, wrong password");
  //   });

  //   it("should not login an inactive user", async () => {
  //     await UsersRepo.updateOneUser(user._id, { active: false });

  //     const res = await request(app).post("/users/login").send({
  //       email: "johndoe@example.com",
  //       password: "password123",
  //     });

  //     expect(res.status).toBe(403);
  //     expect(res.body.success).toBe(false);
  //     expect(res.body.message).toBe("this user is not active");
  //   });
  // });

  // describe("GET /user/:id", () => {
  //   it("should return a user by id", async () => {
  //     const res = await request(app)
  //       .get(`/users/${user._id}`)
  //       .set("Authorization", `Bearer ${token}`);

  //     expect(res.status).toBe(200);
  //     expect(res.body.success).toBe(true);
  //     expect(res.body.data._id).toBe(user._id.toString());
  //     expect(res.body.data.name).toBe(user.name);
  //     expect(res.body.data.email).toBe(user.email);
  //     expect(res.body.data.active).toBe(user.active);
  //     expect(res.body.data.gender).toBe(user.gender);
  //     expect(res.body.data.postscount).toBe(user.postscount);
  //   });
  // });

  // describe("PUT /user/:id", () => {
  //   it("should update a user by id", async () => {
  //     const res = await request(app)
  //       .put(`/users/${user._id}`)
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({
  //         name: "Updated Name",
  //       });

  //     expect(res.status).toBe(200);
  //     expect(res.body.success).toBe(true);
  //     expect(res.body.data._id).toBe(user._id.toString());
  //     expect(res.body.data.name).toBe("Updated Name");
  //     expect(res.body.data.email).toBe(user.email);
  //     expect(res.body.data.active).toBe(user.active);
  //     expect(res.body.data.gender).toBe(user.gender);
  //     expect(res.body.data.postscount).toBe(user.postscount);
  //   });
  // });
});
