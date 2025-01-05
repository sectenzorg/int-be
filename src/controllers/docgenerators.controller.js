const Docgenerators = require("../models/docgenerators.model");
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const Mastermenus = require("../models/mastermenus.model");
const Issuelogs = require("../models/issuelogs.model");
dayjs.extend(utc);
dayjs.extend(timezone);
async function getAllDoc(request, reply){

}
module.exports = {
    getAllDoc
};