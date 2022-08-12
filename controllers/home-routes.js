const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Comment, Vote, Review } = require("../models");

const withAuth = require("../utils/auth");

// get all reviews for homepage
router.get("/", (req, res) => {
  console.log("======================");
  Review.findAll({
    attributes: [
      "id",
      "review_text",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE review.id = vote.review_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "review_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const reviews = dbPostData.map((review) => review.get({ plain: true }));

      res.render("homepage", {
        reviews,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single review
router.get("/review/:id", withAuth, (req, res) => {
  Review.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "review_text",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE review.id = vote.review_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "review_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No review found with this id" });
        return;
      }

      const review = dbPostData.get({ plain: true });

      res.render("single-review", {
        review,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
