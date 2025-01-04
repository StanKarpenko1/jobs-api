"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = __importDefault(require("./db/connect"));
const auth_1 = require("./middleware/auth");
// extra sequrity
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
// const xssClean = require('xss-clean');
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Initialize environment variables
dotenv_1.default.config();
// ROUTERS
const auth_2 = __importDefault(require("./router/auth"));
const jobs_1 = __importDefault(require("./router/jobs"));
// ERROR HANDLING MIDDLEWARES
const not_found_1 = require("./middleware/not-found");
const error_handler_1 = require("./middleware/error-handler");
// Initialize express app
const app = (0, express_1.default)();
// MIDDLEWARE
app.set('trust proxy', 1);
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.    
}));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ credentials: true }));
// app.use(xssClean())
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
// Define routes
app.use('/api/v1/auth', auth_2.default);
app.use('/api/v1/jobs', auth_1.auth, jobs_1.default);
// Error handling middlewares
app.use(not_found_1.notFound);
app.use(error_handler_1.errorHandlerMiddleware);
// Connect to MongoDB and start server
const mongoURL = process.env.MONGO_URL;
const _port = process.env.PORT || 9000;
const startServer = async () => {
    try {
        // Validate environment variables
        if (!mongoURL) {
            throw new Error('MONGO_URL is not defined in the environment variables');
        }
        // Connect to MongoDB
        await (0, connect_1.default)(mongoURL);
        console.log('Connected to MongoDB...');
        // Start the server
        const server = http_1.default.createServer(app);
        server.listen(_port, () => {
            console.log(`Server is running on http://localhost:${_port}/`);
        });
    }
    catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1); // Exit process on failure
    }
};
startServer();
//# sourceMappingURL=index.js.map