const { Review } = require("../models");
const { faker } = require("@faker-js/faker");

const reviewdata = [];

for (let i = 0; i < 10; i++) {
  let createdReview = {
    title: faker.lorem.sentence(4),
    review_text: faker.lorem.paragraph(20),
    user_id: faker.mersenne.rand(10, 1),
  };
  reviewdata.push(createdReview);
}
const seedReviews = () => Review.bulkCreate(reviewdata);

module.exports = seedReviews;
