export interface ReservationsGetModel {
  message: string;
  status: number;
  code: string;
  code_app: string;
  data: ReservationsDataModel
}

export interface ReservationsDataModel {
  items: ReservationsItems[];
}

export interface ReservationsItems {
  id: number,
  date: string,
  time: string,
  number_people: number,
  duration: number,
  reservations_statuses_id: number,
  users_id: number,
  restaurants_id: number,
  rooms_id: number,
  created_at: string,
  updated_at: string,
  reservations_statuses_name: string,
  restaurant_name: string,
  hotel_name: string,
}

export interface ReservationsPostModel {
  message: string;
  status: number;
  code: string;
  code_app: string;
  data: { id: number }
}