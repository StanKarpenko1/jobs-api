import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connect';

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
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());

// Define routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

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
