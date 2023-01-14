import express from 'express';
import {
  uploadFeed,
  getFeeds,
  getFeed,
  updateFeed,
  deleteFeed,
} from '../controllers/feedController';
import { photoUpload } from '../server/middlewares';

const feedRouter = express.Router();

feedRouter.get('/', getFeeds);
feedRouter.get('/:id', getFeed);
feedRouter.post('/', photoUpload.single('photo'), uploadFeed);
feedRouter.put('/:id', updateFeed);
feedRouter.delete('/:id', deleteFeed);

export default feedRouter;
