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

    // some difficult shi
// traks yes no shares
    qYes: {
    type: Number,
    default: 1000
},
qNo: {
    type: Number,
    default: 1000
},
liquidityB: {
    type: Number,
    default: 500
},

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




