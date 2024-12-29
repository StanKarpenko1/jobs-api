import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import connectDB from './db/connect';
import { auth as authenticateUser } from './middleware/auth'

// extra sequrity
import cors from 'cors';
import helmet from 'helmet' 
// const xssClean = require('xss-clean');
import rateLimiter from 'express-rate-limit';

// Initialize environment variables
dotenv.config();

// ROUTERS
import authRouter from './router/auth';
import jobsRouter from './router/jobs';

// ERROR HANDLING MIDDLEWARES
import { notFound } from './middleware/not-found'; 
import { errorHandlerMiddleware } from './middleware/error-handler';


// Initialize express app
const app = express();

// MIDDLEWARE
app.set('trust proxy', 1)

app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
        standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
        // store: ... , // Redis, Memcached, etc. See below.    
        }
))

app.use(express.json());
app.use(helmet())
app.use(cors({ credentials: true }));
// app.use(xssClean())
app.use(compression());
app.use(cookieParser());


// Define routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

// Error handling middlewares
app.use(notFound);
app.use(errorHandlerMiddleware);

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
        await connectDB(mongoURL);
        console.log('Connected to MongoDB...');

        // Start the server
        const server = http.createServer(app);
        server.listen(_port, () => {
            console.log(`Server is running on http://localhost:${_port}/`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1); // Exit process on failure
    }
};

startServer();
