const mongoose = require("mongoose");

const userScheama = new mongoose.Schema({

    username: {
        type:String,
        required:true
    },

     email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    balance: {
        type: Number,
        default: 1000
    }
},{
timestamps:true
}
);

module.exports = mongoose.model("User", userSchema);