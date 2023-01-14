import 'dotenv/config';
import './db';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import feedRouter from '../routers/feedRouter';

const app = express();
const logger = morgan('dev');

const PORT = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);
app.use('/uploads', express.static('uploads'));
app.use('/feed', feedRouter);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
