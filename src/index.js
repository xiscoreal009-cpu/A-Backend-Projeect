// require('dotenv').config();


import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import {app} from "./app.js"
dotenv.config()

connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000,()=>{
  console.log(`server started successfully${process.env.PORT}`)

  })
})
.catch((error)=>{
  console.log("connection error",error)
})
console.log("ENV CHECK:", process.env.MONGODB_URI);
     


/*
import express from "express";
const app = express()(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`app is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("ERROR:", error);
    throw err;
  }
})();
*/