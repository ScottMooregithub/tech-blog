const { faker } = require("@faker-js/faker");
const { Comment } = require("../models");

const commentdata = [];

for (let i = 0; i < 100; i++) {
  let createdComment = {
    comment_text: faker.lorem.sentence(),
    user_id: faker.mersenne.rand(10, 1),
    review_id: faker.mersenne.rand(10, 1),
  };
  commentdata.push(createdComment);
}

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;