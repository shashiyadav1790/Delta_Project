const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isloggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//create Review
router.post("/",validateReview,isloggedIn,wrapAsync(reviewController.createReview))

// delete Raview
router.delete("/:reviewId",isloggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

//Exports
module.exports = router;