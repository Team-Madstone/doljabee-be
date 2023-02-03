import { check, CustomValidator } from 'express-validator';
import User from '../models/User';

export const isExistUsername: CustomValidator = async (value) => {
  const user = await User.exists({ username: value });
  if (user) {
    return Promise.reject('이미 존재하는 닉네임입니다.');
  }
};

export const isExistEmail: CustomValidator = async (value) => {
  const user = await User.exists({ email: value });
  if (user) {
    return Promise.reject('이미 존재하는 이메일입니다.');
  }
};

export const validationRule = {
  Name: {
    Create: () =>
      check('name')
        .notEmpty()
        .withMessage('이름 필드가 누락되었습니다.')
        .isLength({
          min: 2,
          max: 10,
        })
        .withMessage('이름은 2 ~ 10글자입니다.'),
  },
  Username: {
    Create: () =>
      check('username')
        .notEmpty()
        .withMessage('닉네임 필드가 누락되었습니다.')
        .isLength({
          min: 2,
          max: 10,
        })
        .withMessage('닉네임은 2 ~ 10글자입니다.')
        .custom(isExistUsername),
  },
  Email: {
    Create: () =>
      check('email')
        .notEmpty()
        .withMessage('이메일 필드가 누락되었습니다.')
        .isEmail()
        .withMessage('올바른 이메일 형식이 아닙니다.')
        .isLength({ max: 255 })
        .withMessage('이메일의 최대 길이는 255자입니다.')
        .custom(isExistEmail),
  },
  Password: {
    Create: () =>
      check('password')
        .notEmpty()
        .withMessage('비밀번호 필드가 누락되었습니다.')
        .isLength({
          min: 6,
          max: 20,
        })
        .withMessage('비밀번호는 6 ~ 20글자입니다.'),
  },
  CallbackUrl: {
    Create: () =>
      check('callbackUrl')
        .notEmpty()
        .withMessage('callbackUrl 필드가 누락되었습니다.')
        .isURL({
          protocols: ['http', 'https'],
          require_protocol: true,
          require_valid_protocol: true,
          require_tld: false,
        })
        .withMessage(
          '올바른 형식의 url이 아닙니다. 허용 되는 프로토콜: http, https'
        ),
  },
};
