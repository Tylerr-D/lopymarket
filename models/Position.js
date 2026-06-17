const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
//little complicated
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    market: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Market",
        required: true
    },

    yesShares: {
        type: Number,
        default: 0
    },
    noShares: {
        type: Number,
    default: 0
    },

        yesAvgPrice: { type: Number, default: 0 },   
    noAvgPrice: { type: Number, default: 0 }   

},{
    timestamps:true
});

module.exports = mongoose.model("Position", positionSchema);
