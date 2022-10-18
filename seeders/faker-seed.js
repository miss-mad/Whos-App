const faker = require("faker");
const { User } = require("../models");
const users = [...Array(100)].map((user) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  userName: faker.internet.userName(),
  password: faker.internet.password(8),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const seedUsers = () => User.bulkCreate(users);

module.exports =
  ({
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("User", users, {});
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("User", null, {});
    },
  },
  seedUsers);
