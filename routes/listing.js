const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isloggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudconfing.js");
const upload = multer({storage}); 

 router.route("/")
 .get(wrapAsync(listingController.index))                                        //index route
 .post(isloggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));  //create route  
  

// new route
router.get("/new",isloggedIn,listingController.renderNewForm);


 router.route("/:id")
 .get( wrapAsync(listingController.showListing))                                       //show route
 .put(isloggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))   //update route 
 .delete(isloggedIn,isOwner,wrapAsync(listingController.deleteListing));               //delete route

//edit route
router.get("/:id/edit",isloggedIn,isOwner,wrapAsync(listingController.editListing));





module.exports = router;
