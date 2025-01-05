const mongoose = require("mongoose");
const DocgeneratorsSchema = new mongoose.Schema({
    docid:{
        type:String,
        required: true
    },
    modulecode:{
        type:String,
        required: true
    },
    year:{
        type:Number,
        required: true
    },
    month:{
        type:Number,
        required: true
    },
    ordernum:{
        type:Number,
        required: true
    }
});
const Docgenerators = mongoose.model("Docgenerators",DocgeneratorsSchema);
module.exports=Docgenerators;