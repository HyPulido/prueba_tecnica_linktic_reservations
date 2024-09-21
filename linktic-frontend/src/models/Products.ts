export interface ProductsGetModel {
  message: string;
  status: number;
  code: string;
  code_app: string;
  data: ProductsDataModel
}

export interface ProductsDataModel {
  items: ProductsItems[];
}

export interface ProductsItems {

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

export interface ProductsPostModel {
  message: string;
  status: number;
  code: string;
  code_app: string;
  data: { id: number }
}