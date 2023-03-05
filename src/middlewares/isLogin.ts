import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { FAILURE } from '../constances/message';
import User from '../models/User';
import { TTokenPayload } from '../types/user';

export const isLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: FAILURE.IsLogin });
    }
    const accessToken = req.headers.authorization.split('Bearer ')[1];

    const payload = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    ) as TTokenPayload;

    const email = payload.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: FAILURE.CannotFindUser });
    }

    req.body.email = email;
    next();
  } catch (error) {
    return res.status(401).send({ message: FAILURE.IsLogin });
  }
};
