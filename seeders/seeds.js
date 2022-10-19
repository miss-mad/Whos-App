// don't need this anymore - can delete entire seeders folder

// Import seeds.js file
const seedUsers = require("./faker-seed");

// Use the sequelize connection from the connection.js file
const sequelize = require("../config/connection");

// Function expression to seed all tables using async/await, then logging a message in the terminal once done
// Must be in this order because otherwise will throw an error because certain foreign keys being referenced don't exist yet
const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  process.exit(0);
};

// To start seeding function
seedAll();
