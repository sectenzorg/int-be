const authController = require('../controllers/authController');
const auth = require("../middlewares/auth");
async function authRoutes(fastify, options) {
    // Login route
    fastify.post('/login', { preHandler: auth }, (request, reply) => {
        authController.login(fastify, request, reply);
    });
}
module.exports = authRoutes;