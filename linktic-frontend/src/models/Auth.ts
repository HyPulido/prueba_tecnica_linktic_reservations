export interface AuthPostModel {
  message: string;
  status: number;
  code: string;
  code_app: string;
  data: AuthItems
}

export interface AuthItems {
  access_token: string,
  token_type: string,
  expires_in: number,
}

export interface LogoutModel {
  message: string;
  status: number;
  code: string;
  code_app: string;
  data: object
}