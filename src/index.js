// require('dotenv').config({path: './env'})
console.log("index.js file is starting");
import dotenv from "dotenv";
//import express from "express"
//const app = express()
//import mongoose from "mongoose";

//import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";
dotenv.config({
    path: './.env'
});
import {app} from "./app.js";
console.log(process.env.CLOUDINARY_CLOUD_NAME);



connectDB(
    console.log("try to connect mongoDB")
)
//console.log("try to connect mongoDB");
.then(() => {
    app.on("error", (error) => {
        console.log("app listening error");
    });
    app.listen(process.env.PORT || 3016, () => {
        console.log( `Server is running at port:${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log("Mongodb connection error", err);
});
// .then(() => {
//     app.listen(process.env.PORT || 3016, () => {
//         console.log(`Server is running at port:${process.env.PORT}`);
//     })
// })
// .catch((err) => {
//     console.log("Mongodb connection error", err);
// })
