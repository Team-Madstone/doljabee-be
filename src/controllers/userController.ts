import { Request, Response } from 'express';
import { DEFAULT_ERROR_MESSAGE } from '../constances/message';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { signup } from '../mail/signup';
import { transporter } from '../utils/mail';
import jwt from 'jsonwebtoken';
import { TCreateUserVariables, TSendVerifyEmail } from '../types/user';

const SALT_ROUND = 10;

const sendVerifyEmail = ({ email, callbackUrl }: TSendVerifyEmail) => {
  try {
    const token = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const mailContent = {
      from: 'Doljabee',
      to: email,
      subject: 'Doljabee 회원가입 확인 메일입니다.',
      html: signup({ callbackUrl, token }),
    };
    transporter.sendMail(mailContent);
  } catch (error) {
    console.log('회원가입 인증 메일 전송 실패');
  }
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
    res.send({ message: '사용자 등록 완료' });

    sendVerifyEmail({ email, callbackUrl });
    return;
  } catch (error) {
    res.status(500).send({ message: DEFAULT_ERROR_MESSAGE });
    return;
  }
};
