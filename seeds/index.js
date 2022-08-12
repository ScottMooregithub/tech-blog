const seedUsers = require("./user-seeds");
const seedReviews = require("./review-seeds");
const seedComments = require("./comment-seeds");
const seedVotes = require("./vote-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("--------------");
  await seedUsers();
  console.log("--------------");

  await seedReviews();
  console.log("--------------");

  await seedComments();
  console.log("--------------");

  process.exit(0);
};

seedAll();
