const mongoose = require("mongoose")

const marketSchema = new mongoose.Schema({
    polymarketId :{
        type: String,
        unique: true
    },

    question:String,
    image:String,
    yesPrice: Number,
    noPrice: Number,

    communityYesImpact : {
        type:Number,
        default:0
    },

    volume:Number,
    liquidity:Number,
    active: Boolean,
    closed:Boolean,
    endDate:Date,

},{
timestamps:true
});

module.exports = mongoose.model("Market", marketSchema);




