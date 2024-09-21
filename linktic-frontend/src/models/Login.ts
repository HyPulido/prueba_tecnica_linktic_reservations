export interface LoginModel {
  message: string;
  status: number;
  code: string;
  code_app: string;
  data?: { access_token: string, token_type: string, expires_in: number };
}