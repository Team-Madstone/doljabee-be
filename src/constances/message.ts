export const DEFAULT_ERROR_MESSAGE = 'SERVER_ERROR';

export const SUCCESS = {
  CreateUser: '사용자 등록이 완료되었습니다.',
  VerifyEmail: '인증이 완료되었습니다.',
  Login: '로그인이 완료되었습니다.',
  RefreshAccessToken: '액세스 토큰 재발급 성공했습니다.',
  Logout: '로그아웃이 완료되었습니다.',
  ChangePassword: '비밀번호를 변경했습니다.',
};

export const FAILURE = {
  UpdateFeed: '피드 업데이트에 실패했습니다.',
  DeleteFeed: '피드 삭제에 실패했습니다.',
  CannotFindUser: '해당 이메일을 찾을 수 없습니다.',
  VerifyEmail: '인증에 실패했습니다.',
  IsLogin: '로그인이 필요합니다.',
  WrongPassword: '비밀번호가 일치하지 않습니다.',
  InvalidToken: '토큰이 유효하지 않습니다.',
  NewPasswordNotMatch: '새로운 비밀번호가 일치하지 않습니다.',
  CurrentPasswordNotMatch: '현재 비밀번호가 일치하지 않습니다.',
};
