import { Request, Response } from 'express';
import { DEFAULT_ERROR_MESSAGE } from '../constances/message';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { TCreateUserVariables } from '../types/user';

const SALT_ROUND = 10;

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
    res.send({ message: '사용자 등록 완료' });
    return;
  } catch (error) {
    res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
    return;
  }
};
