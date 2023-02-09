const mongoose = require("mongoose");
const constants = require("./constants");

function database() {
    mongoose
        .connect(constants.DATABASE_URI, {
            // useCreateIndex:true,
            // useNewUrlParser:true,
            // userUnifiedTopology:true,
        })
        .then(() => {
            console.log("Yay! MongoDB is connected");
        })
        .catch((err) => {
            console.log("There was an error while connecting to the database.");
        })
}

module.exports = database;