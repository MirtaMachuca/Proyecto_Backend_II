import express from "express";
import config from "./config/index.js";
import sessionRouter from "./routes/session.router.js";
import usersRouter from "./routes/users.router.js";
import viewsRouter from "./routes/views.router.js"
import hbs from "express-handlebars";
import mongoose from "mongoose";

import session from "espress-session";
import cookieParser from "cookie-parser";
import passport from "passport";

const {PORT, MONGO_URI,SECRET}= config;
const server=express();

server.engine("handlebars", hbs.engine());
server.set("views", import.meta.dirname + "/views")
server.set("view engine" , "handlebars")


server.use("/", viewsRouter);
server.use("/api/users", usersRouter);
server.use("/api/session", sessionRouter);

server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({extended :true}));
server.use(session({
    secret:SECRET,
    saveUninitialized:true,
    resave: false,
    cookie:{
        httpOnly:true,
        sameSite: true,
        maxAge: 24*60*60
        
    }
}))
initializedPassport();
server.use(passport.initialize());
server.use(passport.session());

server.listen( PORT, ()=> console.log(`listening on port ${PORT}`));

mongoose.connect(MONGO_URI, {dbName : "pre_entregaI"})
    .then(()=> console.log("MongoDB connect successfully"))
    .catch((err)=>{
    console.error({error:err.meddage})
    process.exit(1)
})
