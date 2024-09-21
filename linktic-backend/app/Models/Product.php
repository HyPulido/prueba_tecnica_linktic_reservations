<?php

namespace App\Models;

use App\Utilities\BaseApp;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Product extends Model
{

    use BaseApp;
    protected $table = "products";
    protected $fillable = ['id', 'upc_code', 'name', 'description', 'price', 'stock', 'image', 'products_categories_id', 'products_types_id', 'products_units_measurement_id', 'products_statuses_id', 'created_at', 'updated_at'];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    // public function orders()
    // {
    //     return $this->belongsToMany(Order::class, 'products_orders', 'products_id');
    // }
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'products_orders', 'products_id', 'orders_id');
    }


    function getProducts()
    {
        $products = $this::join('products_categories', 'products.products_categories_id', '=', 'products_categories.id')
            ->join('products_units_measurement', 'products.products_units_measurement_id', '=', 'products_units_measurement.id')
            ->join('products_statuses', 'products.products_statuses_id', '=', 'products_statuses.id')
            ->get(['products.*', 'products_categories.name AS category_name', 'products_categories.description AS category_description', 'products_units_measurement.name AS unit_measurement_name', 'products_units_measurement.description AS unit_measurement_description', 'products_statuses.name AS product_status_name', 'products_statuses.description AS product_status_description']);

        return $products;
    }

    function createProduct($product)
    {
        foreach ($product as $key => $value) {
            $this->$key = $value;
        }
        $this->save();
        return $this;
    }

    function updateProduct($product, $id)
    {
        return $this->where('id', $id)->update($product);
    }

    function verifyAvailableProducts($products)
    {
        $rejected_items = [];
        $available_items = [];
        $not_exist = [];
        foreach ($products as $product) {

            $productData = $this::find($product['id']);

            if (isset($productData)) {
                if ($productData['stock'] >= $product['quantity'] && $productData['products_statuses_id'] == 1) {
                    $available_items[] = $productData;
                } else {
                    $rejected_items[] = $productData;
                }
            } else {
                $not_exist[] = $product;
            }
        }
        return ['rejected_items' => $rejected_items, 'available_items' => $available_items, 'not_exist' => $not_exist];
    }

    function calculatePriceTotalProducts($products)
    {
        $product_ids = array_column($products, 'id');

        $productosModel = Product::whereIn('id', $product_ids)->get()->keyBy('id');

        $total = 0;

        foreach ($products as $producto) {
            if (isset($productosModel[$producto['id']])) {
                $productoModel = $productosModel[$producto['id']];
                $total += $productoModel->price * $producto['quantity']; // Asumiendo que la columna del precio se llama 'price'
            }
        }
        return $total;
    }
}
