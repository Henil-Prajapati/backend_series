// require("dotenv").config({path: "./.env"});  
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import app from './app.js';

dotenv.config(
    { 
        path: "./.env" 
    }
);  

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Express server started successfully");
        console.log(`Server is running on port ${process.env.PORT}`);
    });
    console.log("Database connected successfully");
})
.catch(error => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
});


















/*
(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error" ,(error) => {
            console.error("Error in app:", error);
            throw error;
        })


        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
})()
*/