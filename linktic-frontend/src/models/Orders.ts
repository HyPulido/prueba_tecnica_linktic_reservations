export interface OrdersGetModel {
  message: string;
  status: number;
  code: string;
  code_app: string;
  data: OrdersDataModel
}

export interface OrdersDataModel {
  items: OrdersItems[];
}

export interface OrdersItems {

  id: number;
  upc_code: string,
  name: string,
  description: string,
  price: string,
  stock: number,
  image: string,
  products_categories_id: number,
  products_units_measurement_id: number,
  products_statuses_id: number,
  created_at: string,
  updated_at: string,
  category_name: string,
  category_description: string,
  unit_measurement_name: string,
  unit_measurement_description: string,
  product_status_name: string,
  product_status_description: string
}

export interface OrdersPostModel {
  message: string;
  status: number;
  code: string;
  code_app: string;
  data: { id: number }
}

export interface OrdersItems {
  id: number,
  note: string,
  price: string,
  address: string,
  orders_statuses_id: 1,
  delivery_types_id: 1,
  created_at: string,
  updated_at: string,
  order_status_name: string,
  order_status_description: string,
  delivery_type_name: string,
  delivery_type_description: string,
  products: ProductsOrders[]
}

export interface ProductsOrders {
  id: number;
  upc_code: string,
  name: string,
  description: string,
  price: string,
  stock: number,
  image: string,
  products_categories_id: number,
  products_units_measurement_id: number,
  products_statuses_id: number,
  created_at: string,
  updated_at: string,
  quantity: number
}
