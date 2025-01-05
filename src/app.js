import Fastify from "fastify"; // Rename default import if necessary
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";
import mongoose from "mongoose";
mongoose.set('debug', true);
import dotenv from "dotenv";
import auth from "./middlewares/auth.js"; // Ensure file extensions are included for ESM
const fastify = Fastify({ logger: true });
import fastifyMultipart from "@fastify/multipart";
// Register fastify-multipart
fastify.register(fastifyMultipart);
// Import routes
import authRoutes from "./routes/authRoutes.routes.js";
import userRoutes from "./routes/user.routes.js";
import mastermenusRoutes from "./routes/mastermenus.routes.js";
import employeesRoutes from "./routes/employees.routes.js";
import useraccessRoutes from "./routes/useraccess.routes.js";
import issuelogsRoutes from "./routes/issuelogs.routes.js";
import companypoliciesRoutes from "./routes/companypolicies.routes.js";
import appflowsettingsRoutes from "./routes/appflowsettings.routes.js";
import importRoutes from "./routes/imports.routes.js";
import leaverequestsRoutes from "./routes/leaverequests.routes.js";
import docgeneratorsRoutes from "./routes/docgenerators.routes.js";
dotenv.config();
//starting server
const start = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'bersanerpdev'
        });
        fastify.register(fastifyJwt, {
            secret: process.env.JWTOKEN
        });
        fastify.register(cors,{
            origin: '*',
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type","Authorization","s-tkn-brsn"],
            credentials: true,
        });
        fastify.register(authRoutes, {prefix: '/api/v1/auth'});
        fastify.register(userRoutes, {prefix: '/api/v1/users'});
        fastify.register(mastermenusRoutes, {prefix: '/api/v1/menu'});
        fastify.register(employeesRoutes, {prefix: '/api/v1/emp'});
        fastify.register(useraccessRoutes, {prefix: '/api/v1/usraccess'});
        fastify.register(issuelogsRoutes, {prefix: '/api/v1/issuelogs'});
        fastify.register(companypoliciesRoutes, {prefix: '/api/v1/policy'});
        fastify.register(appflowsettingsRoutes, {prefix: '/api/v1/appflow'});
        fastify.register(importRoutes, {prefix: '/api/v1/import'});
        fastify.register(leaverequestsRoutes, {prefix: '/api/v1/leave'});
        fastify.register(docgeneratorsRoutes, {prefix: '/api/v1/docgen'});
        // Register the custom MIME type parser for Excel file
        fastify.addContentTypeParser(
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            { parseAs: 'buffer' },
            (req, body, done) => done(null, body)
        );
        fastify.addContentTypeParser('application/pdf', { parseAs: 'buffer' }, (req, body, done) => done(null, body));
        await fastify.listen({
            port: parseInt(process.env.PORT || "3006"),
            host: "0.0.0.0",
        });
        fastify.log.info(`Server is running on port ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
        fastify.log.error("Error connecting to DB: " + error);
        process.exit(1);
    }
};
start();