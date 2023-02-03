export type TUser = {
  name: string;
  email: string;
  username: string;
  password: string;
  verifyEmail: boolean;
};

export type TUserVariables = Omit<TUser, 'verifyEmail'>;

export type TCreateUserVariables = TUserVariables & {
  callbackUrl: string;
};

export type TSendVerifyEmail = {
  email: string;
  callbackUrl: string;
};

export type TSignupVariables = {
  callbackUrl: string;
  token: string;
};

export type TTokenPayload = {
  email: string;
};
