<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Utilities\BaseApp;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{

    use BaseApp;

    public function index()
    {
        $error_code = 'ORIX200';
        $data = null;
        try {
            $orderTable = new Order;
            $getOrders = $orderTable->getOrders();

            if (isset($getOrders) && count($getOrders) > 0) {
                $data = $this->setCustomizePagination($this->parseArrayToPaginate(new Collection($getOrders)));
            } else {
                $error_code = 'ORIX402';
            }
        } catch (\Exception $e) {
            $error_code = "ORIX500";
            $data['error'] = array($this->getException($e));
        }
        return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => $data, 'function' => __FUNCTION__, 'class' => __CLASS__));
    }

    public function store(Request $request)
    {
        $error_code = 'ORSE201';
        $data = null;
        try {
            if ($this->validateRequiredFields($request, array('and' => array('products', 'delivery_types_id')))) {

                $user_id = Auth::user()->id;

                if ($request->delivery_types_id == 2 && !$this->validateRequiredFields($request, array('address'))) {
                    $request->request->set('required_field', 'address');
                    $error_code = 'ORSE402';
                } else {
                    $delivery_types_id = $request->delivery_types_id;

                    if (is_array($request->products) && count($request->products) > 0) {

                        $products = $request->products;

                        $productTable = new Product;

                        // Verificar que los productos estan disponibles
                        $verifyAvailableProducts = $productTable->verifyAvailableProducts($products);

                        if (count($verifyAvailableProducts['not_exist']) == 0 && count($verifyAvailableProducts['rejected_items']) == 0) {
                            $price_total = $productTable->calculatePriceTotalProducts($products);

                            $orderTable = new Order;
                            $orderData = [];
                            $orderData['note'] = $request->note ?? NULL;
                            $orderData['orders_statuses_id'] = 1;
                            $orderData['deliveries_types_id'] = $delivery_types_id;
                            $orderData['price'] = $price_total;
                            $orderData['users_id'] = $user_id;

                            $createOrder = $orderTable->createOrder($orderData);

                            if ($createOrder) {
                                $order_id = $createOrder->id;
                                $data['id'] = $order_id;
                                $orderTable->addProductsToOrder($order_id, $products);
                            } else {
                                $error_code = 'ORSE406';
                            }
                        } else {
                            $error_code = 'ORSE405';
                            $data = $verifyAvailableProducts;
                        }
                    } else {
                        $error_code = 'ORSE403';
                    }
                }
            } else {
                $error_code = "ORSE400";
            }
        } catch (\Exception $e) {
            $error_code = "ORSE500";
            $data['error'] = array($this->getException($e));
        }
        return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => $data, 'function' => __FUNCTION__, 'class' => __CLASS__));
    }

    public function show($order_id)
    {
        $error_code = 'ORSW200';
        $data = null;
        try {
            $orderTable = new Order;
            $getOrderById = $orderTable->getOrderById($order_id);

            if (isset($getOrderById) && count($getOrderById) > 0) {
                $data = $this->setCustomizePagination($this->parseArrayToPaginate(new Collection($getOrderById)));
            } else {
                $error_code = 'ORSW402';
            }
        } catch (\Exception $e) {
            $error_code = "ORSW500";
            $data['error'] = array($this->getException($e));
        }
        return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => $data, 'function' => __FUNCTION__, 'class' => __CLASS__));
    }
}
