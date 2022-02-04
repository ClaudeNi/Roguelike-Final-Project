const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
    email: {
        type: String,
        required: true,
        unique: true,
        validator: function (value) {
            if (!validator.isEmail(value)) {
                throw new Error(`${value} is not an email`);
            }
        },
    },
    password: {
        type: String,
        required: true,
    },
    saveData: {
        type: Object,
    },
});
module.exports = User;
