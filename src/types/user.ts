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
