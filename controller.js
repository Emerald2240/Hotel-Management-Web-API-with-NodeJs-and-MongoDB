const Room = require("./RoomModel");
const RoomType = require("./RoomTypeModel");

class Controller {
    async getAllRooms() {
        return await Room.find();
    }

    async addRoom(room) {
        return await Room.create(room);
    }

    async getRoomById(id) {
        return await Room.findOne({ _id: id });
    }

    async findRoom(roomName, roomType, minPrice, maxPrice) {
        // return await Room.find({
        //     'name': roomName,
        //     'room_type': roomType,
        //     'price': { $gt: minPrice, $lt: maxPrice }
        // });

        // return await Room.find().
        //     where('name').equals(roomName).
        // populate({
        //     path: 'room_type',
        //     match: { name: roomType },
        // }).
        //     where('price').gt(minPrice).lt(maxPrice)

        // return await Room.find().
        // where('name').equals(roomName).
        // populate('room_type').
        // where('price').gt(minPrice).lt(maxPrice);

        return await Room.find().
            and([
                {
                    $or: [{ name: roomName },
                    { 'price': { $gt: minPrice, $lt: maxPrice } }
                    ]
                },
                {
                    $or: [{ path: 'room_type', match: { name: roomType } },
                    { 'price': { $gt: minPrice, $lt: maxPrice } }
                    ]
                }
            ]).
            populate('room_type')
    }

    async editRoomById(id, data) {
        return await Room.findOneAndUpdate({ _id: id }, data);
    }

    async deleteRoomById(id) {
        return await Room.findOneAndDelete({ _id: id });
    }

    //Room Type Section
    async getAllRoomTypes() {
        // return await RoomType.find()
        //     .select('name description');

        return await RoomType.find();
    }

    async addRoomType(roomType) {
        return await RoomType.create(roomType);
    }

    async getRoomTypeById(id) {
        return await RoomType.findOne({ _id: id });
    }

    async editRoomTypeById(id, data) {
        return await RoomType.findOneAndUpdate({ _id: id }, data);
    }

    async deleteRoomTypeById(id) {
        return await RoomType.findOneAndDelete({ _id: id });
    }
}

module.exports = new Controller();