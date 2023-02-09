const constants = {
    DATABASE_URI: process.env.DATABASE_URI,

    DATABASES: {
        PERSON: "person",
    },

    USER_TYPES: {
        USER: "user",
        AGENT: "agent",
    },

    MESSAGES: {
        FETCHED: "Resource fetched successfully",
        UPDATED: "Resource updated successfully",
        ERROR: "Resource error",
        CREATED: "Resource created successfully",
        DELETED: "Resource deleted successfully"
    }
};

module.exports = constants;