export interface ErrorCodesGetModel {
  message: string;
  status: number;
  code: string;
  code_app: string;
  data: ErrorCodesDataModel
}

export interface ErrorCodesDataModel {
  items: ErrorCodesItems[];
}

export interface ErrorCodesItems {
  code: string;
  status_code: number;
  controller: string;
  message: string;
  description: string;
  cause: string;
  code_app: string;
}

export interface ErrorCodesPostModel {
  message: string;
  status: number;
  code: string;
  code_app: string;
  data: [id: number]
}