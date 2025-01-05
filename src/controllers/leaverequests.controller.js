const Leaverequests = require("../models/leaverequests.model");
const Docgenerators = require("../models/docgenerators.model");
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const Mastermenus = require("../models/mastermenus.model");
const Issuelogs = require("../models/issuelogs.model");
dayjs.extend(utc);
dayjs.extend(timezone);
async function getAllLeave(request, reply){
    //initial value
    var ack = 1;
    var msg = "";
    var statuscode = 200;
    var resp = "";
    try{
        var laverequests=await Leaverequests.find();
        msg = "OK";
    }catch(error){
        var currentDateTime = dayjs().tz("Asia/Jakarta").format();
        var logData = {
            logtime: currentDateTime,
            menucode: "",
            logcategory: "error",
            apistatus: "failed",
            sysmessage: error.message,
            humanmessage: "An error occurred",
            userid: "",
            username: "",
            useremail: "",
            action: "view",
            apiname: "getallleave",
            docid: ""
        };
        const issuelog = new Issuelogs(logData);
        issuelog.save();
        console.log(error);
        statuscode = 500;
        ack = 0;
        msg = error.message;
    }
    resp = {
        "statuscode"    : statuscode,
        "ack"           : ack,
        "message"       : msg,
        "datares"       : laverequests
    }
    reply.send(resp);
}
async function insertLeave(request, reply){
    var ack = 1;
    var msg = "";
    var statuscode = 200;
    var resp = "";
    try{
        const leaverequests = new Leaverequests(request.body);
        var msgDt = dayjs().tz("Asia/Jakarta").format();
        leaverequests.created_date=msgDt;
        leaverequests.lastupdate_time=msgDt;
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; // Months are zero-based in JavaScript
        const results = await Docgenerators.findOne({
            modulecode: "LVREQ",
            year: currentYear,
            month: currentMonth
        }).sort({ ordernum: -1 }) // Descending order by `ordernum`
            .limit(1); // Limit to 1 document;
        if (!results) {
            var docid = `001/LVREQ/${currentMonth}/${currentYear}/SiBG`;
            const modulecode='LVREQ';
            const orderNo = String(1).padStart(3, "0"); // Generates "001"
            const orderNoAsNumber = Number(orderNo);
            const newDoc = new Docgenerators({
                docid: docid,
                modulecode: modulecode,
                year: currentYear,
                month: currentMonth,
                ordernum: orderNoAsNumber
            });
            // Save to the database
            const savedDoc = await newDoc.save();
        }else{
            var currdocid=results.docid;
            const regex = /^(\d{3})\/LVREQ\/(\d{2})\/(\d{4})\/SiBG$/; // Regex to capture the numeric part
            // Extract the numeric part of the docid
            const matches = currdocid.match(regex);
            // Increment the numeric part (first group)
            const incrementedNumber = String(parseInt(matches[1], 10) + 1).padStart(3, "0");
            const orderNoAsNumber = Number(incrementedNumber);
            // Reconstruct the docid with the incremented number
            var docid = `${incrementedNumber}/LVREQ/${matches[2]}/${matches[3]}/SiBG`;
            const modulecode='LVREQ';
            const newDoc = new Docgenerators({
                docid: docid,
                modulecode: modulecode,
                year: currentYear,
                month: currentMonth,
                ordernum: orderNoAsNumber
            });
            // Save to the database
            const savedDoc = await newDoc.save();
        }
        leaverequests.doc_id=docid;
        leaverequests.save();
        msg = "OK";
    }catch(error){
        var currentDateTime = dayjs().tz("Asia/Jakarta").format();
        var logData = {
            logtime: currentDateTime,
            menucode: "",
            logcategory: "error",
            apistatus: "failed",
            sysmessage: error.message,
            humanmessage: "An error occurred",
            userid: "",
            username: "",
            useremail: "",
            action: "create",
            apiname: "insertleave",
            docid: ""
        };
        const issuelog = new Issuelogs(logData);
        issuelog.save();
        console.log(error);
        statuscode = 500;
        ack = 0;
        msg = error.message;
    }
    resp = {
        "statuscode"    : statuscode,
        "ack"           : ack,
        "message"       : msg
    }
    reply.send(resp);
}

    //for overlapping check in edit leave api
    /*const resultOverlapp = await Leaverequests.find({
        created_by: leaverequests.created_by, // Match created_by (userid from the session or request)
        doc_id: { $ne: docid }, // Exclude the given docid
        leave_end: {
            $gte: new Date(startdate), // Leave end greater than or equal to startdate
            $lte: new Date(enddate) // Leave end less than or equal to enddate
        },
        status: {
            $nin: ['11', '2', '7', '4'] // Status is not in the excluded list
        }
    });

    if (results.length > 0) {
        // If overlap is found, return the doc_id(s) that overlap
        const overlappingDocIds = results.map(result => result.doc_id);
        reply.send({ message: 'Overlap found', overlappingDocIds });
    } else {
        // No overlap found
        reply.send({ message: 'No overlap found' });
    }*/

module.exports = {
    getAllLeave,
    insertLeave
};