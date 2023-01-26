import express from 'express';
import {
  uploadFeed,
  getFeeds,
  getFeed,
  deleteFeed,
  updateFeed,
} from '../controllers/feedController';
import { photoUpload } from '../server/middlewares';

const feedRouter = express.Router();

feedRouter.get('/', getFeeds);
feedRouter.get('/:id', getFeed);
feedRouter.post('/', photoUpload.single('photo'), uploadFeed);
feedRouter.put('/:id', photoUpload.single('photo'), updateFeed);
feedRouter.delete('/', deleteFeed);

export default feedRouter;
