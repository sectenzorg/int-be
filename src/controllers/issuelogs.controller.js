const Issuelogs = require("../models/issuelogs.model");
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
async function getAllIssueLog(request, reply){
    try{
        //initial value
        var ack = 1;
        var msg = "";
        var statuscode = 200;
        var resp = "";
        var logs=await Issuelogs.find();
        msg = "OK";
    }catch(error){
        var currentdatetime = dayjs().tz("asia/jakarta").format();
        var logdata = {
            logtime: currentdatetime,
            menucode: "",
            logcategory: "error",
            apistatus: "failed",
            sysmessage: error.message,
            humanmessage: "an error occurred",
            userid: request.body.userid,
            username: request.body.username,
            useremail: request.body.useremail,
            action: "view",
            apiname: "getallissuelog",
            docid: ""
        };
        const issuelog = new issuelogs(logdata);
        issuelog.save();
        statuscode = 500;
        ack = 0;
        msg = error;
    }
    resp = {
        "statuscode"    : statuscode,
        "ack"           : ack,
        "message"       : msg,
        "datares"       : logs
    }
    reply.send(resp);
}
module.exports = {getAllIssueLog}