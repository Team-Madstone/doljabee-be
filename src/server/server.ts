import 'dotenv/config';
import './db';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import feedRouter from '../routers/feedRouter';
import userRouter from '../routers/userRouter';

const app = express();
const logger = morgan('dev');

const PORT = 4000;

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);
app.use('/uploads', express.static('uploads'));
app.use('/feed', feedRouter);
app.use('/user', userRouter);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
