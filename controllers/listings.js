const { query } = require("express");
const Listing = require("../models/listing.js");
// const mbxGeoCoding= require("@mapbox/mapbox-sdk/services/geocoding");
// const mapToken = process.env.MAP_TOKEN;
// const geoCodingClient = mbxGeoCoding({accessToken: mapToken});


module.exports.index = (async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listing/index.ejs",{allListings});
});

module.exports.renderNewForm = (async(req,res)=>{
    res.render("listing/new.ejs");
})

module.exports.showListing = (async(req,res)=>{
    let {id} = req.params;
   const listing =  await Listing.findById(id).populate({path: "review", populate: {path: "author"}}).populate("owner");
   if(!listing){
    req.flash("error","Listing You Requested For Does Not Exist");
    res.redirect("/listings");
   }
   res.render("listing/show.ejs",{listing})
})

// module.exports.createListing = async(req,res,next)=>{
//     let response = await geoCodingClient.forwardGeocode({
//         query: req.body.listing.location,
//         limit: 1,
//     })
//     .send();

//     let url = req.file.path;
//     let filename = req.file.filename;
//     const newListing =  new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//     newListing.image = {url,filename};
//     newListing.geometry = response.body.features[0].geometry;
                                                           
//    const newlisting =  await newListing.save();
//    console.log(newlisting);
//     req.flash("success","new Listing created!");
//     res.redirect("/listings");      


module.exports.createListing = async(req,res,next)=>{
   
    // let response = await geoCodingClient.forwardGeocode({
    //     query: req.body.listing.location,
    //     limit: 1,
    //})
    //.send();
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing =  new Listing(req.body.listing);
    console.log(newListing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    // newListing.geometry = response.body.features[0].geometry;

   const newlisting =  await newListing.save();
   console.log(newlisting);
    req.flash("success","new Listing created!");
    res.redirect("/listings");
};


module.exports.editListing = (async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
      if(!listing){
    req.flash("error","Listing You Requested For Does Not Exist");
    res.redirect("/listings");
   }
   let OriginalUrl = listing.image.url;
   OriginalUrl =  OriginalUrl.replace("/upload","/upload/h_150,w_300")
    res.render("listing/edit.ejs",{listing,OriginalUrl});
})

module.exports.updateListing = (async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
});

module.exports.deleteListing = (async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
});