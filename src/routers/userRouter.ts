import express from 'express';
import {
  changePassword,
  changeUsername,
  createUser,
  getMyProfile,
  loginUser,
  logout,
  refreshAccessToken,
  sendResetPasswordEmail,
  verifyEmail,
} from '../controllers/userController';
import { resetPassword } from '../mail/resetPassword';
import { isLogin } from '../middlewares/isLogin';
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
userRouter.get('/get-my-profile', isLogin, getMyProfile);
userRouter.post('/change-password', isLogin, changePassword);
userRouter.post('/forgot-password', sendResetPasswordEmail);
userRouter.post('/reset-password', resetPassword);
userRouter.post('/change-username', isLogin, changeUsername);

export default userRouter;
