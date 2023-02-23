import { CookieOptions, Request, Response } from 'express';
import { DEFAULT_ERROR_MESSAGE, FAILURE, SUCCESS } from '../constances/message';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { signup } from '../mail/signup';
import { transporter } from '../utils/mail';
import jwt from 'jsonwebtoken';
import {
  TCreateUserVariables,
  TSendVerifyEmail,
  TTokenPayload,
  TUser,
} from '../types/user';
import { HydratedDocument, Types } from 'mongoose';
import { resetPassword } from '../mail/resetPassword';

const SALT_ROUND = 10;

const getVerifyEmailToken = (email: string) =>
  jwt.sign(
    {
      email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );

const sendVerifyEmail = ({ email, callbackUrl }: TSendVerifyEmail) => {
  const token = getVerifyEmailToken(email);

  const mailContent = {
    from: 'Doljabee',
    to: email,
    subject: 'Doljabee 회원가입 확인 메일입니다.',
    html: signup({ callbackUrl, token }),
  };
  transporter.sendMail(mailContent);
};

const getAccessToken = (email: string) =>
  jwt.sign(
    {
      email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

const getRefreshToken = (email: string) =>
  jwt.sign(
    {
      email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '180d' }
  );

const refreshAccessTokenOption = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 180,
  sameSite: 'none',
  secure: true,
} as CookieOptions;

const sendTokens = (
  user: HydratedDocument<TUser>,
  res: Response,
  message: string
) => {
  const accessToken = getAccessToken(user.email);
  const refreshToken = getRefreshToken(user.email);

  res
    .cookie('refreshToken', refreshToken, refreshAccessTokenOption)
    .send({ accessToken, message });
};

const getHashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(SALT_ROUND);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const createUser = async (
  req: Request<TCreateUserVariables>,
  res: Response
) => {
  try {
    const { name, email, username, password, callbackUrl } = req.body;
    const hashedPassword = await getHashedPassword(password);

    const user = new User({
      name,
      email,
      username,
      password: hashedPassword,
      verifyEmail: false,
    });

    await user.save();
    res.status(200).send({ message: SUCCESS.CreateUser });

    try {
      return sendVerifyEmail({ email, callbackUrl });
    } catch (error) {
      return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
    }
  } catch (error) {
    return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const payload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    ) as TTokenPayload;

    const user = await User.findOne({ email: payload.email });

    if (!user) {
      return res.status(400).send({ message: FAILURE.CannotFindUser });
    }

    await user.updateOne({ $set: { verifyEmail: true } });
    return res.status(200).send({ message: SUCCESS.VerifyEmail });
  } catch (error) {
    return res.status(405).send({ message: FAILURE.VerifyEmail });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: FAILURE.CannotFindUser });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(400).send({ message: FAILURE.WrongPassword });
    }

    return sendTokens(user, res, SUCCESS.Login);
  } catch (error) {
    return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const token = req.headers.cookie.split('refreshToken=')[1];

    if (!token) {
      return res.status(401).send({ message: FAILURE.InvalidToken });
    }

    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const { email } = payload as TTokenPayload;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: FAILURE.CannotFindUser });
    }

    return sendTokens(user, res, SUCCESS.RefreshAccessToken);
  } catch (error) {
    return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('refreshToken');

  return res.status(200).send({
    message: SUCCESS.Logout,
    accessToken: req.headers.authorization,
  });
};

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization.split('Bearer ')[1];

    if (!accessToken) {
      return res.status(401).send({ message: FAILURE.InvalidToken });
    }

    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const { email } = payload as TTokenPayload;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: FAILURE.CannotFindUser });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization.split('Bearer ')[1];

    if (!accessToken) {
      return res.status(401).send({ message: FAILURE.InvalidToken });
    }

    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const { email } = payload as TTokenPayload;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).send({ message: FAILURE.CannotFindUser });
      return;
    }

    const { oldPassword, newPassword, newPasswordConfirmation } = req.body;
    const hashedPassword = await getHashedPassword(newPassword);
    const matchedPassword = await bcrypt.compare(oldPassword, user.password);

    if (!matchedPassword) {
      return res.status(400).send({ message: FAILURE.CurrentPasswordNotMatch });
    }

    if (newPassword !== newPasswordConfirmation) {
      return res.status(400).send({ message: FAILURE.NewPasswordNotMatch });
    } else {
      await user.updateOne({ $set: { password: hashedPassword } });
      return res.status(200).send({ message: SUCCESS.ChangePassword });
    }
  } catch (error) {
    return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};

export const sendResetPasswordEmail = async (req: Request, res: Response) => {
  try {
    const { email, callbackUrl } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: FAILURE.CannotFindUser });
    }

    const token = getVerifyEmailToken(email as string);

    const mailContent = {
      from: 'Doljabee',
      to: email,
      subject: 'Doljabee 비밀번호 재설정 메일입니다.',
      html: resetPassword({
        callbackUrl: callbackUrl as string,
        token,
        email: email as string,
      }),
    };
    transporter.sendMail(mailContent);
    return res.status(200).send({ message: SUCCESS.SuccessSendMail });
  } catch (error) {
    return res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};
