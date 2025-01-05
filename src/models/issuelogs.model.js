const mongoose = require("mongoose");
const IssueLogsSchema = new mongoose.Schema({
    logtime:{
        type:Date,
        required: true,
        trim: true
    },
    menucode:{
        type:String,
        trim: true
    },
    logcategory:{
        type:String,
        trim: true
    },
    apistatus:{
        type:String,
        trim: true
    },
    sysmessage:{
        type:String,
        trim: true
    },
    humanmessage:{
        type:String,
        trim: true
    },
    userid:{
        type:String,
        trim: true
    },
    username:{
        type:String,
        trim: true
    },
    useremail:{
        type:String,
        trim: true
    },
    action:{
        type:String,
        trim: true
    },
    docid:{
        type:String,
        trim: true
    }
});
const Issuelogs = mongoose.model("Issuelogs",IssueLogsSchema);
module.exports=Issuelogs;