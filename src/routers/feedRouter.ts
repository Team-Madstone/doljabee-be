import express from 'express';
import {
  uploadFeed,
  getFeeds,
  getFeed,
  deleteFeed,
  updateFeed,
} from '../controllers/feedController';
import { isLogin } from '../middlewares/isLogin';
import { photoUpload } from '../server/middlewares';

const feedRouter = express.Router();

feedRouter.get('/', getFeeds);
feedRouter.get('/:id', getFeed);
feedRouter.post('/', isLogin, photoUpload.single('photo'), uploadFeed);
feedRouter.put('/:id', isLogin, photoUpload.single('photo'), updateFeed);
feedRouter.delete('/', isLogin, deleteFeed);

export default feedRouter;
