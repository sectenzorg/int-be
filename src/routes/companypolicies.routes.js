const companypoliciesController = require("../controllers/companypolicies.controller");
const auth = require("../middlewares/auth");
async function routes(fastify, options){
    // Add a global hook for token verification
    fastify.addHook('onRequest', async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.code(401).send({ ack:0, error: 'Unauthorized.' }); // Handle unauthorized access
        }
    });
    fastify.get("/getallpolicy", { preHandler: auth }, companypoliciesController.getAllPolicy);
    fastify.post("/getpolicybydoc", { preHandler: auth }, companypoliciesController.getPolicyByDoc);
    fastify.post("/getpolicybydepartment", { preHandler: auth }, companypoliciesController.getPolicyByDepartment);
    fastify.post("/getpolicybycategory", { preHandler: auth }, companypoliciesController.getPolicyByCategory);
    fastify.post("/insertpolicy", { preHandler: auth }, companypoliciesController.insertPolicy);
    fastify.post("/updatepolicy", { preHandler: auth }, companypoliciesController.updatePolicy);
}
module.exports = routes;