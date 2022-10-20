const faker = require("faker");
const { User } = require("../models");

const userData = [...Array(10)].map(() => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    userName: faker.internet.userName(),
    password: faker.internet.password(8),
}));


// Save the output of userData to a local file AND overwrite existing json file with new seed information
const fs = require("fs");
fs.writeFileSync(
  "./seeds/data_from_faker.json",
  JSON.stringify({userData: userData}),
  function (err) {
    if (err) throw err;
    console.log("complete");
  }
);

const seedUsers = () =>
  User.bulkCreate(userData, {
    // Use the hooks defined in the User model so that the user passwords can be hashed correctly by bcrypt
    individualHooks: true,
    returning: true,
  });

module.exports = seedUsers;
