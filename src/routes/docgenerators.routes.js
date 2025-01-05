const docgeneratorsController = require("../controllers/docgenerators.controller");
const auth = require("../middlewares/auth");
async function routes(fastify, options){
    fastify.get("/getalldoc", { preHandler: auth }, docgeneratorsController.getAllDoc);
}
module.exports = routes;