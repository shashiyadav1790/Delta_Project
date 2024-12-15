const express = require('express');
const router = express.Router();
const Listing  = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");

router.get("/trending",wrapAsync(async(req,res)=>{
    let listings = await Listing.find();
    let allListings= listings.filter((el)=>el.category == "trending");
    res.render("./listing/index.ejs",{allListings});
}))

router.get("/room",wrapAsync(async(req,res)=>{
    let listings = await Listing.find();
    let allListings= listings.filter((el)=>el.category == "room");
    res.render("./listing/index.ejs",{allListings});
}))

router.get("/iconi",wrapAsync(async(req,res)=>{
    let listings = await Listing.find();
    let allListings= listings.filter((el)=>el.category == "iconi");
    res.render("./listing/index.ejs",{allListings});
}))

router.get("/mountains",wrapAsync(async(req,res)=>{
    let listings = await Listing.find();
    let allListings= listings.filter((el)=>el.category == "mountains");
    res.render("./listing/index.ejs",{allListings});
}))

router.get("/castles",wrapAsync(async(req,res)=>{
    let listings = await Listing.find();
    let allListings= listings.filter((el)=>el.category == "castles");
    res.render("./listing/index.ejs",{allListings});
}))

router.get("/pools",wrapAsync(async(req,res)=>{
    let listings = await Listing.find();
    let allListings= listings.filter((el)=>el.category == "pools");
    res.render("./listing/index.ejs",{allListings});
}))

router.get("/farms",wrapAsync(async(req,res)=>{
    let listings = await Listing.find();
    let allListings= listings.filter((el)=>el.category == "farms");
    res.render("./listing/index.ejs",{allListings});
}))

router.get("/camping",wrapAsync(async(req,res)=>{
    let listings = await Listing.find();
    let allListings= listings.filter((el)=>el.category == "camping");
    res.render("./listing/index.ejs",{allListings});
}))

router.get("/arctic",wrapAsync(async(req,res)=>{
    let listings = await Listing.find();
    let allListings= listings.filter((el)=>el.category == "arctic");
    res.render("./listing/index.ejs",{allListings});
}))

router.get("/domes",wrapAsync(async(req,res)=>{
    let listings = await Listing.find();
    let allListings= listings.filter((el)=>el.category == "domes");
    res.render("./listing/index.ejs",{allListings});
}))



module.exports = router;
