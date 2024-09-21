export interface SingUpModel {
  message: string;
  status: number;
  code: string;
  code_app: string;
  data?: { id: number };
}