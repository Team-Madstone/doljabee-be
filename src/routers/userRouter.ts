import express from 'express';
import {
  createUser,
  loginUser,
  logout,
  refreshAccessToken,
  verifyEmail,
} from '../controllers/userController';
import { validationRule } from '../middlewares/userValidationRule';
import { validate } from '../utils/validate';

const userRouter = express.Router();

userRouter.post(
  '/',
  validate([
    validationRule.Name.Create(),
    validationRule.Username.Create(),
    validationRule.Email.Create(),
    validationRule.Password.Create(),
    validationRule.CallbackUrl.Create(),
  ]),
  createUser
);
userRouter.post('/verify-email', verifyEmail);
userRouter.post('/login', loginUser);
userRouter.post('/refresh-access-token', refreshAccessToken);
userRouter.post('/logout', logout);

export default userRouter;
