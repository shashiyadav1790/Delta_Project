const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = 'mongodb://127.0.0.1:27017/wandurluster';

main().then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    await Listing.deleteMany({}),
    initdata.data = initdata.data.map((obj)=>({...obj , owner: "665b1a6c7a83f3318fff5a84" }))                                
    await Listing.insertMany(initdata.data)
    console.log("data was initialized");
}
initDB();