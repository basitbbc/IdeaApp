const express = require('express');
const serverConfig = require('/config/workspace/IdeaApp/configs/server.config');
const mongoose = require('mongoose');
const dbConfig = require('/config/workspace/IdeaApp/configs/db.config');
const userModel = require('/config/workspace/IdeaApp/models/user.model');
const bcrypt = require('bcrypt');

const app = express();

// Logic to connect to MongoDB and create an ADMIN user
// Need to have the mongoDB up and running in your local machine
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
    console.log("Error while connecting to DB");
});
db.once("open", ()=>{
    console.log("DB is connected");

    init();
})

async function init(){
       
    /**
     * Check if the admin user is already present
     */
    let admin = await userModel.findOne({
        userId : "admin"
    })

    if(admin){
        console.log("Admin user already present");
        return;
    }

    admin = await userModel.create({
        name : "Abdul Basit",
        userId : "admin",
        email : "abdulbasitbbc@gmail.com",
        userType : "ADMIN",
        password : bcrypt.hashSync("Welcome1",8)

    });
    console.log(admin);
}


app.listen(serverConfig.PORT, ()=>{
    console.log(`Server started on port ${serverConfig.PORT}`);
})
