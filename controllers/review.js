const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = (async(req,res)=>{
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new review was saved");
    req.flash("success","New Review Created");
    res.redirect(`/listings/${listing._id}`);
});

module.exports.deleteReview = (async(req,res)=>{
    let {id,reviewId} = req.params;

    await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted");
    res.redirect(`/listings/${id}`);
});