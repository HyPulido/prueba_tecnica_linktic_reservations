export interface UserGetModel {
  message: string;
  status: number;
  code: string;
  code_app: string;
  data: UsersItems
}

export interface UsersGetModel {
  message: string;
  status: number;
  code: string;
  code_app: string;
  data: UsersDataModel
}

export interface UsersDataModel {
  items: UsersItems[];
}

export interface UsersItems {
  id: number,
  identification_type: null,
  identification_number: number,
  email: string,
  first_name: string,
  last_name: string,
  profile_image_url: null,
  phone_area_code: number,
  phone_number: number,
  status_id: number,
  status_name: string,
  roles_id: number,
  role_name: string,
  devices_id: string,
  created_at: string,
  updated_at: string
}

export interface UsersPostModel {
  message: string;
  status: number;
  code: string;
  code_app: string;
  data: [id: number]
}