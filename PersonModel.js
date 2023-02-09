const { model, Schema } = require("mongoose");
const constants = require("./constants");
const { USER_TYPES, DATABASES } = constants;

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    user_type: {
        type: String,
        required: true,
        enum: [USER_TYPES.USER, USER_TYPES.AGENT],
    },
},
    {
        timestamps: true,
    }
);

const Person = model(DATABASES.PERSON, PersonSchema);
module.exports = Person;