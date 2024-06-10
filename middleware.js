const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const expressErrror = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");



module.exports.isloggedIn= (req,res,next)=>{
     if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to create listing");
        return res.redirect("/login");
     }
     next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you are not owner of this listings");
        return res.redirect(`/listings/${listing.id}`);
    }
   next();
}


module.exports.validateListing = (req,res,next)=>{
    console.log(req.body);
    const {error} = listingSchema.validate(req.body);
    if(error){
     let errmsg = error.details.map((el)=>el.message).join(",");
     throw new expressErrror(400,errmsg);
    }else{
     next();
    }
 }


 module.exports.validateReview = (req,res,next)=>{
    console.log(req.body);
    const {error} = reviewSchema.validate(req.body);
    if(error){
     let errmsg = error.details.map((el)=>el.message).join(",");
     throw new expressErrror(400,errmsg);
    }else{
     next();
    }
 }


 module.exports.isReviewAuthor = async(req,res,next)=>{
   let  {id,reviewId} = req.params;
   let review = await Review.findById(reviewId);
   if(!review.author.equals(res.locals.currUser._id)){
         req.flash("error","you are not the author of this listings");
         return res.redirect(`/listings/${id}`);
   }
   next();
 }