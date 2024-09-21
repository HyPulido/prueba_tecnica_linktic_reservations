<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = "orders";

    protected $fillable = ['id', 'note', 'price', 'address',  'orders_statuses_id', 'delivery_types_id', 'created_at', 'updated_at'];

    public $timestamps = false;


    public function products()
    {
        return $this->belongsToMany(Product::class, 'products_orders', 'orders_id', 'products_id')
            ->withPivot('quantity');
    }

    function getOrders()
    {
        $orders = $this::with(['products'])
            ->select(
                'orders.*',
                'orders_statuses.name AS order_status_name',
                'orders_statuses.description AS order_status_description',
                'deliveries_types.name AS delivery_type_name',
                'deliveries_types.description AS delivery_type_description'
            )
            ->join('orders_statuses', 'orders.orders_statuses_id', '=', 'orders_statuses.id')
            ->join('deliveries_types', 'orders.deliveries_types_id', '=', 'deliveries_types.id')
            ->get();

        // Recorremos cada orden y sus productos para mover la cantidad fuera del objeto pivot
        foreach ($orders as $order) {
            foreach ($order->products as $product) {
                $product->quantity = $product->pivot->quantity;
                unset($product->pivot);  // Eliminamos el objeto pivot
            }
        }

        return $orders;
    }

    public function createOrder($order)
    {
        foreach ($order as $key => $value) {
            $this->$key = $value;
        }
        $this->save();
        return $this;
    }

    public function addProductsToOrder($order_id, $products)
    {
        $order = Order::find($order_id);
        $attachData = [];
        foreach ($products as $product) {
            $attachData[$product['id']] = ['quantity' => $product['quantity']];
        }
        return $order->products()->attach($attachData);
    }

    function getOrderById($order_id)
    {
        $orders = $this::with(['products'])
            ->select(
                'orders.*',
                'orders_statuses.name AS order_status_name',
                'orders_statuses.description AS order_status_description',
                'deliveries_types.name AS delivery_type_name',
                'deliveries_types.description AS delivery_type_description'
            )
            ->join('orders_statuses', 'orders.orders_statuses_id', '=', 'orders_statuses.id')
            ->join('deliveries_types', 'orders.deliveries_types_id', '=', 'deliveries_types.id')
            ->where('orders.id', $order_id)
            ->get();

        // Recorremos cada orden y sus productos para mover la cantidad fuera del objeto pivot
        foreach ($orders as $order) {
            foreach ($order->products as $product) {
                $product->quantity = $product->pivot->quantity;
                unset($product->pivot);  // Eliminamos el objeto pivot
            }
        }

        return $orders;
    }
}
