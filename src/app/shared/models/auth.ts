export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IRegisterRequest {
  id: number;
  username: string;
  password: string;
  email: string;
}
