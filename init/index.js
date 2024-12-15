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
    initdata.data = initdata.data.map((obj)=>({...obj , owner: "66bf0464143f7641b5fe2a3d" }))                                
    await Listing.insertMany(initdata.data)
    console.log("data was initialized");
}
initDB();