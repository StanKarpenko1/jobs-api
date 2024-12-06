import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose'
// import router from './router';

const app = express();

// connect DB

// routers
import authRouter from './router/auth'
import jobsRouter from './router/jobs'

// error handling
import { notFound } from './middleware/not-found';
import { errorHandlerMiddleware } from './middleware/error-handler'

app.use(express.json())

// extra packages
app.use (cors({
    credentials: true,
 }));
app.use(compression());
app.use(cookieParser());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

// middlewares
app.use(notFound);
app.use(errorHandlerMiddleware)

//server
const server = http.createServer(app);

//create server
const _port = 9000
const serverLink = `http://localhost:${_port}/`

server.listen(_port, () => {
   console.log(`Server is listening on ${_port}, use link: ${serverLink}`)
});



