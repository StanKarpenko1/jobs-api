import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose'
// import router from './router';

const app = express();

app.use (cors({
    credentials: true,
 }));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

//create server
const _port = 9000
const serverLink = `http://localhost:${_port}/`


server.listen(_port, () => {
   console.log(`Server is listening on ${_port}, use link: ${serverLink}`)
});
