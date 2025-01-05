const leaverequestsController = require("../controllers/leaverequests.controller");
const auth = require("../middlewares/auth");
async function routes(fastify, options){
    fastify.get("/getallleave", { preHandler: auth }, leaverequestsController.getAllLeave);
    fastify.post("/insertleave", { preHandler: auth }, leaverequestsController.insertLeave);
}
module.exports = routes;