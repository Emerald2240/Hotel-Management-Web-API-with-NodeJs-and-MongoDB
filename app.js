//a module imported from the node_modules folder, is always inside double quotes and without slashes or dots
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const constants = require("./constants");
const database = require("./database");
const Controller = require("./controller");
const app = express();
const { MESSAGES } = constants;

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

//base api
app.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.FETCHED, success: true });
});

//fetch all users
app.get("/api/v1/users", async (req, res) => {
    try {
        const users = await Controller.getAllPersons();
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data: users });
    } catch (err) {
        res
        .status(500)
        .send({message: err.message || MESSAGES.ERROR, success: false});
    }
});

app.listen(PORT, ()=> {
    database();
    console.log(`Server started on port: ${PORT}`);
});