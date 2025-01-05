const appflowsettingsController = require("../controllers/appflowsettings.controller");
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
    fastify.get("/getallappflow", { preHandler: auth }, appflowsettingsController.getAllAppFlow);
    fastify.post("/getappflowbymenucode", { preHandler: auth }, appflowsettingsController.getAppFlowByMenucode);
    fastify.post("/insertappflow", { preHandler: auth }, appflowsettingsController.insertAppFlow);
    fastify.post("/updateappflow", { preHandler: auth }, appflowsettingsController.updateAppFlow);
    fastify.post('/generateToken', { preHandler: auth }, async (request, reply) => {
        const guestToken = fastify.jwt.sign({ role: 'guest', sessionId: Date.now() }, { expiresIn: '1h' });
        return { token: guestToken };
    });
    fastify.post("/checkuser", { preHandler: auth }, appflowsettingsController.checkUser);
}
module.exports = routes;