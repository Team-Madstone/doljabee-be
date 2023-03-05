import express from 'express';
import { createComment, deleteComment } from '../controllers/commentController';

import { isLogin } from '../middlewares/isLogin';

const commentRouter = express.Router();

commentRouter.post('/', isLogin, createComment);
commentRouter.delete('/', isLogin, deleteComment);

export default commentRouter;
