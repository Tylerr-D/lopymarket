const mongoose = require("mongoose")


//we gonna use all this in synnMarket 
const marketSchema = new mongoose.Schema({
    polymarketId :{
        type: String,
        unique: true
    },

    question:String,
    image:String,

polymarketYesPrice: Number,
polymarketNoPrice: Number,
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




