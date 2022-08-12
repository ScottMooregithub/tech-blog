const sequelize = require("../config/connection");
const { User, Review } = require("../models");
const { faker } = require("@faker-js/faker");

const userdata = [];

for (let i = 0; i < 10; i++) {
  let createUser = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: "12345",
  };
  userdata.push(createUser);
}
const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;
