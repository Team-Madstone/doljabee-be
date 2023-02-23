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

const getAccessToken = (_id: Types.ObjectId) =>
  jwt.sign(
    {
      _id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

const getRefreshToken = (_id: Types.ObjectId) =>
  jwt.sign(
    {
      _id,
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
  const accessToken = getAccessToken(user._id);
  const refreshToken = getRefreshToken(user._id);

  res
    .cookie('refreshToken', refreshToken, refreshAccessTokenOption)
    .send({ accessToken, message });
};

export const createUser = async (
  req: Request<TCreateUserVariables>,
  res: Response
) => {
  try {
    const { name, email, username, password, callbackUrl } = req.body;
    const salt = await bcrypt.genSalt(SALT_ROUND);
    const hashedPassword = await bcrypt.hash(password, salt);

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
