if(process.env.NODE_ENV != "production"){
      require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const expressErrror = require("./utils/ExpressError.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const { error } = require("console");

const dbUrl = process.env.ATLASDB_URl;


main().then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    mongoose.connect(dbUrl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret:  process.env.SECRET,
    },
    touchAfter: 24*3600,
});

store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION STORE",err)
});

const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now()+ 7 * 24 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})
app.use("/listings",listingsRouter)
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);

app.all("*",(req,res,next)=>{
  next(new expressErrror(404,"page not found"));
})

app.use((err,req,res,next)=>{
    const {status=500,message="something went wrong"} = err;
    res.status(status).render("error.ejs",{message});
})

app.listen(port,()=>{
    console.log("listining on port",port);
});