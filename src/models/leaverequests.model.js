const mongoose = require("mongoose");
const LeaverequestsSchema = new mongoose.Schema({
    doc_id:{
        type:String,
        required: true
    },
    leave_type:{
        type:String,
        required: true
    },
    created_date:{
        type:Date,
        required: true
    },
    leave_start:{
        type:Date,
        required: true
    },
    leave_end:{
        type:Date,
        required: true
    },
    days_count:{
        type:String,
        required: true
    },
    delegate_to:{
        type:String,
        required: true
    },
    reason:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    emergency_contact:{
        type:String,
        required: true
    },
    status:{
        type:String,
        required: true
    },
    notes:{
        type:String,
        required: true
    },
    created_by:{
        type:String,
        required: true
    },
    creator_name:{
        type:String,
        required: true
    },
    creator_email:{
        type:String,
        required: true,
        lowercase: true
    },
    lastupdate_by:{
        type:String,
        required: true
    },
    lastupdate_name:{
        type:String,
        required: true
    },
    lastupdate_time:{
        type:Date,
        required: true
    }
});
const Leaverequests = mongoose.model("Leaverequests",LeaverequestsSchema);
module.exports=Leaverequests;