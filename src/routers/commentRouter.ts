import express from 'express';
import { createComment } from '../controllers/commentController';

import { isLogin } from '../middlewares/isLogin';

const commentRouter = express.Router();

commentRouter.post('/', isLogin, createComment);

export default commentRouter;
