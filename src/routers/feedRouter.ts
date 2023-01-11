import express from 'express';
import {
  uploadFeed,
  getFeeds,
  getFeed,
  updateFeed,
  deleteFeed,
} from '../controllers/feedController';

const feedRouter = express.Router();

feedRouter.get('/', getFeeds);
feedRouter.get('/:id', getFeed);
feedRouter.post('/', uploadFeed);
feedRouter.put('/:id', updateFeed);
feedRouter.delete('/:id', deleteFeed);

export default feedRouter;
