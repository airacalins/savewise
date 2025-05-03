export type RegisterUserRequest = {
  email: string;
  password: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};
