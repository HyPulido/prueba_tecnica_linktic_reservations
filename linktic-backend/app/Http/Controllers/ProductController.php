<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Utilities\BaseApp;
use Illuminate\Database\Eloquent\Collection;

class ProductController extends Controller
{
    use BaseApp;

    public function index(Request $request)
    {
        $error_code = 'PTIX200';
        $data = null;
        try {
            $productTable = new Product;
            $getProductsByStore = $productTable->getProducts();

            if (isset($getProductsByStore) && count($getProductsByStore) > 0) {
                $data = $this->setCustomizePagination($this->parseArrayToPaginate(new Collection($getProductsByStore)));
            } else {
                $error_code = 'PTIX402';
            }
        } catch (\Exception $e) {
            $error_code = "PTIX500";
            $data['error'] = array($this->getException($e));
        }
        return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => $data, 'function' => __FUNCTION__, 'class' => __CLASS__));
    }

    public function store(Request $request)
    {
        $error_code = 'PTSE201';
        $data = null;
        try {
            if ($this->validateRequiredFields($request, array('and' => array('upc_code', 'name', 'price', 'stock', 'products_categories_id', 'products_units_measurement_id')))) {
                $productTable = new Product;
                $createProduct = $productTable->createProduct(['upc_code' => $request->upc_code, 'name' => $request->name, 'price' => $request->price, 'stock' => $request->stock, 'image' => $request->image, 'products_categories_id' => $request->products_categories_id, 'products_units_measurement_id' => $request->products_units_measurement_id, 'products_statuses_id' => $request->products_statuses_id ?? 1]);

                if ($createProduct) {
                    $data['id'] = $createProduct->id;
                } else {
                    $error_code = 'PTSE402';
                }
            } else {
                $error_code = "PTSE405";
            }
        } catch (\Exception $e) {
            $error_code = "PTSE500";
            $data['error'] = array($this->getException($e));
        }

        return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => $data, 'function' => __FUNCTION__, 'class' => __CLASS__));
    }

    public function update($product_id, Request $request)
    {
        $error_code = 'PTUE201';
        $data = null;
        try {
            if ($this->validateRequiredFields($request, array('and' => array('id')))) {
                $productTable = new Product;

                $productData = [];

                if (isset($request->upc_code)) {
                    $productData['upc_code'] = $request->upc_code;
                }

                if (isset($request->name)) {
                    $productData['name'] = $request->name;
                }

                if (isset($request->price)) {
                    $productData['price'] = $request->price;
                }

                if (isset($request->stock)) {
                    $productData['stock'] = $request->stock;
                }

                if (isset($request->image)) {
                    $productData['image'] = $request->image;
                }

                if (isset($request->products_categories_id)) {
                    $productData['products_categories_id'] = $request->products_categories_id;
                }

                if (isset($request->products_units_measurement_id)) {
                    $productData['products_units_measurement_id'] = $request->products_units_measurement_id;
                }

                if (isset($request->products_statuses_id)) {
                    $productData['products_statuses_id'] = $request->products_statuses_id;
                }

                $createProduct = $productTable->updateProduct($productData, $product_id);

                if ($createProduct) {
                    $data['id'] = $product_id;
                } else {
                    $error_code = 'PTUE402';
                }
            } else {
                $error_code = "PTUE405";
            }
        } catch (\Exception $e) {
            $error_code = "PTUE500";
            $data['error'] = array($this->getException($e));
        }
        return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => $data, 'function' => __FUNCTION__, 'class' => __CLASS__));
    }


    public function show($product_id)
    {
        $error_code = 'PTSW200';
        $data = null;
        try {
            $productTable = new Product;
            $getProductById = $productTable->getProductById($product_id);

            if (isset($getProductById) && count($getProductById) > 0) {
                $data = $this->setCustomizePagination($this->parseArrayToPaginate(new Collection($getProductById)));
            } else {
                $error_code = 'PTSW402';
            }
        } catch (\Exception $e) {
            $error_code = "PTSW500";
            $data['error'] = array($this->getException($e));
        }
        return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => $data, 'function' => __FUNCTION__, 'class' => __CLASS__));
    }
}
