const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,validateReview,isreviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");


//postReviews route

router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//Delete reviews route

router.delete("/:reviewId",isLoggedIn,isreviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;