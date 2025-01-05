const issuelogsController = require("../controllers/issuelogs.controller");
const auth = require("../middlewares/auth");
const employeesController = require("../controllers/employees.controller");
async function routes(fastify, options){
    // Add a global hook for token verification
    fastify.addHook('onRequest', async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.code(401).send({ ack:0, error: 'Unauthorized.' }); // Handle unauthorized access
        }
    });
    fastify.get("/getallissuelog", { preHandler: auth }, issuelogsController.getAllIssueLog);
}
module.exports = routes;