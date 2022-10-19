// npm run seed runs this file to seed each table in the user_info database

// Import js file
const seedUsers = require("./user_seeds");

// Use the sequelize connection from the connection.js file
const sequelize = require("../config/connection");

// Function expression to seed table using async/await, then logging a message in the terminal once done
const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  process.exit(0);
};

// To start seeding function
seedAll();
