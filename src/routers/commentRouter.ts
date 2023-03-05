import express from 'express';
import {
  createComment,
  deleteComment,
  editComment,
} from '../controllers/commentController';

import { isLogin } from '../middlewares/isLogin';

const commentRouter = express.Router();

commentRouter.post('/', isLogin, createComment);
commentRouter.delete('/', isLogin, deleteComment);
commentRouter.put('/:id', isLogin, editComment);

export default commentRouter;
