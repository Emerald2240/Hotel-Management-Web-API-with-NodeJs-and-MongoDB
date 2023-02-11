//#region Set up and initialisation side

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

//#endregion



//#region GET Region

//base api
app.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.FETCHED, success: true });
});

//fetch all rooms
app.get("/api/v1/rooms", async (req, res) => {
    try {
        const rooms = await Controller.getAllRooms();
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data: rooms });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

//fetch particular room with its id
app.get("/api/v1/room", async (req, res) => {
    try {
        const users = await Controller.getRoomById();
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data: users });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

//fetch particular room with its roomname or roomtype or min price or max price
app.get("/api/v1/room-search", async (req, res) => {

    let roomName = req.query.search;
    let roomType = req.query.roomType;
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;

    if (roomName === undefined) {
        roomName = "";
    }

    if (roomType === undefined) {
        roomType = "";
    }

    if (minPrice === undefined) {
        minPrice = 0;
    }

    if (maxPrice === undefined) {
        maxPrice = 9999999999999999;
    }

    console.log(roomName);
    console.log(roomType);
    console.log(minPrice);
    console.log(maxPrice);

    try {
        const users = await Controller.findRoom(roomName, roomType, minPrice, maxPrice);
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data: users });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});



//Room Type Section/////////////////////////////////////////////////////////////////


//fetch all room types
app.get("/api/v1/room-types", async (req, res) => {
    try {
        const roomTypes = await Controller.getAllRoomTypes();
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data: roomTypes });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

//fetch particular room type with its id
app.get("/api/v1/room-type", async (req, res) => {
    try {
        const roomType = await Controller.getRoomtypeById();
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data: roomType });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

//#endregion


//#region POST Region

//create a room type
app.post("/api/v1/room-type", async (req, res) => {
    try {
        const data = await Controller.addRoomType(req.body);
        res
            .status(201)
            .send({ message: MESSAGES.CREATED, success: true, data });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

//create a room
app.post("/api/v1/room", async (req, res) => {
    try {
        const data = await Controller.addRoom(req.body);
        res
            .status(201)
            .send({ message: MESSAGES.CREATED, success: true, data });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

//#endregion


//#region PATCH Region
//#endregion


//#region DELETE Region
//#endregion


// Code Start Section
app.listen(PORT, () => {
    database();
    console.log(`Server started on port: ${PORT}`);
});