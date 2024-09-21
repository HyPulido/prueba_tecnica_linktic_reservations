<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Utilities\BaseApp;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    use BaseApp;

    public function save(Request $request)
    {
        $error_code = "URSE201";
        $data = null;

        try {
            if ($this->validateRequiredFields($request, array('and' => array('first_name', 'last_name', 'email', 'phone_number', 'phone_area_code', 'password')))) {
                $first_name = $request->first_name;
                $last_name = $request->last_name;
                $email = $this->aesDecrypt($request->email);
                $phone_number = $this->aesDecrypt($request->phone_number);
                $phone_area_code = $request->phone_area_code;
                $password = $this->aesDecrypt($request->password);

                if ($email != null && $phone_number != null && $password != null) {
                    $user_id = hexdec(uniqid());
                    $dataUserFindEmail = User::where('email', $email)->first();
                    $dataUserFindDeviceNumber = User::where('phone_number', $phone_number)->first();

                    if ($dataUserFindEmail) {
                        $error_code = "URSE400";
                    } else if ($dataUserFindDeviceNumber) {
                        $error_code = "URSE402";
                    }

                    $dataUser = new User;
                    if ($error_code == "URSE201") {
                        $dataUser->id = $user_id;
                        $dataUser->first_name = $first_name;
                        $dataUser->first_name = $first_name;
                        $dataUser->last_name = $last_name;
                        $dataUser->email = $email;
                        $dataUser->phone_area_code = $phone_area_code;
                        $dataUser->phone_number = $phone_number;
                        $dataUser->password = app('hash')->make($password);
                        $dataUser->status_id = 2;
                        $dataUser->roles_id = 3;

                        if ($dataUser->save()) {
                            $data['id'] =  $dataUser->id;
                        } else {
                            $error_code = "URSE403";
                        }
                    }
                } else {
                    $error_code = "URSE406";
                }
            } else {
                $error_code = "URSE405";
            }
        } catch (\Exception $e) {
            $error_code = "URSE500";
            $data['error'] = $this->getException($e);
        }
        return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => $data, 'function' => __FUNCTION__, 'class' => __CLASS__));
    }

    public function login(Request $request)
    {
        $error_code = "URLN200";
        $data = null;
        try {

            if ($this->validateRequiredFields($request, array('and' => array('email', 'password')))) {
                $email = $this->aesDecrypt($request->email);
                $password = $this->aesDecrypt($request->password);

                $credentials = ["email" => $email, "password" => $password];

                if (!$token = auth()->attempt($credentials)) {
                    $error_code = "URLN401";
                } else {
                    $data = User::respondWithToken($token)->original;
                }
            } else {
                $error_code = "URLN400";
            }
        } catch (\Exception $e) {
            $error_code = "URLN500";
            $data['error'] = $this->getException($e);
        }

        return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => $data, 'function' => __FUNCTION__, 'class' => __CLASS__));
    }

    public function logout()
    {
        $error_code = "URLT200";
        $data = null;
        try {
            if (!auth()->guard("api")->invalidate(true)) {
                $error_code = "URLT400";
            }
        } catch (\Exception $e) {
            $error_code = "URLT500";
            $data['error'] = $this->getException($e);
        }

        return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => $data, 'function' => __FUNCTION__, 'class' => __CLASS__));
    }

    public function getCurrentUser()
    {
        $error_code = "URGCU200";
        $data = null;
        try {
            $data = Auth::user();
        } catch (\Exception $e) {
            $error_code = "URGCU500";
            $data['error'] = $this->getException($e);
        }

        return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => $data, 'function' => __FUNCTION__, 'class' => __CLASS__));
    }

    public function encrypt(Request $request)
    {
        $response = array();
        foreach ($request->all() as $key => $value) {
            $response[$key] = $this->aesEncrypt($value);
        }
        return response()->json($response, 200);
    }

    public function decrypt(Request $request)
    {
        $response = array();
        foreach ($request->all() as $key => $value) {
            $response[$key] = $this->aesDecrypt($value);
        }
        return response()->json($response, 200);
    }
}
