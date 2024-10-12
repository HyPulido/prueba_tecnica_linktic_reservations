<?php

namespace App\Utilities;

use App\Models\ErrorCode;
use App\Models\LogServer;
use App\Models\LogApp;
use App\Models\LogCron;
use App\Models\NotificationTopic;
use App\Models\Device;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;

trait BaseApp
{

    /**
     * Get Error By Code, get a brief description to error through of error code
     *
     * @param string $code
     * @return object
     */
    public function getErrorByCode($code)
    {
        $dataErrorCode = Cache::remember("error_code_$code", 3600, function () use ($code) {
            return ErrorCode::where("code", $code)->paginate(1, ['*'], 'page', 1);
        });
        // $dataErrorCode= ErrorCode::where("code", $code)->paginate(1, ['*'], 'page', 1);

        $dataErrorCode = $this->setCustomizePagination($dataErrorCode);
        if (!$dataErrorCode) {
            $dataErrorCode = array("code" => $code, "status_code" => 500, "controller" => null, "message" => "code invalid", "description" => null, "cause" => null, "code_app" => "ERROR_CODE_INVALID");
            $dataErrorCode = json_decode(json_encode($dataErrorCode), false);
        }
        return $dataErrorCode;
    }




    /**
     * Insert log call apis in the server
     *
     * @param string $function
     * @param string $class
     * @param string $response
     * @return void
     */
    public function saveLog($function, $class, $response)
    {
        try {

            $request = Request();

            $user_id = NULL;
            $device_id = $request->header('Device-Id');
            if ($dataAuthUser = Auth::user()) {
                $user_id = $dataAuthUser->id;
                $device_id = $dataAuthUser->devices_id;
            } else {
                $dataUser = User::where('devices_id', $device_id)->first();
                if ($dataUser) {
                    $user_id = $dataUser->id;
                }
            }

            $status = $response[0]['status'];
            $response_time = round((microtime(true) - $_SERVER['REQUEST_TIME']), 3);

            $ip = $this->getIp();

            if ($this->validateRequestResponseLogs($function)) {
                if ($response[0]['data']) {
                    $response[0]['data']['items'] = ['Data Long ' . count(json_decode(json_encode($response[0]['data']['items']), true)) . " (not save here for size)"];
                }
            }
            $request_all = str_replace('"', "'", stripslashes(json_encode($request->all())));
            $response = str_replace('"', "'", stripslashes(json_encode($response)));

            Log::channel("server")->debug($ip . "   |   " . $function . "    |   " . $class . "  |   " . $request->url() . " |   " . $request->method() . "  |   " . $request_all . "    |   " . $response . "    |   " . $status . "  |   " . $response_time);
        } catch (Exception $e) {
            $data = $this->getException($e);
            Log::channel("error_server")->alert(json_encode($data));
        }
    }

    /**
     * Validate if a request/response log should be ignored based on the given function.
     *
     * @param string $function The name of the function to check.
     * @return bool Returns true if the log should be ignored, false otherwise.
     */
    public function validateRequestResponseLogs($function)
    {
        $functions_ignore = array('getByDeviceId', 'getByUserId');
        return in_array($function, $functions_ignore);
    }

    /**
     * Encrypt a text string using the AES method
     *
     * @param [type] $text_plain
     * @return string
     */
    public function aesEncrypt($text_plain)
    {
        $CIPHER_KEY = getenv("KEY_AES_ENCRYPT");
        $OPENSSL_CIPHER_NAME = "AES-128-CBC";
        $CIPHER_KEY_LEN = 16;
        $CIPHER_IV = random_bytes($CIPHER_KEY_LEN);

        if (strlen($CIPHER_KEY) < $CIPHER_KEY_LEN) {
            $CIPHER_KEY = str_pad($CIPHER_KEY, $CIPHER_KEY_LEN, "0"); //0 pad to len 16
        } else if (strlen($CIPHER_KEY) > $CIPHER_KEY_LEN) {
            $CIPHER_KEY = substr($str = 0, 0, $CIPHER_KEY_LEN); //truncate to 16 bytes
        }

        $encodedEncryptedData = base64_encode(openssl_encrypt($text_plain, $OPENSSL_CIPHER_NAME, $CIPHER_KEY, OPENSSL_RAW_DATA, $CIPHER_IV));
        $response = base64_encode(json_encode(array("ciphertext" => $encodedEncryptedData, "iv" => base64_encode($CIPHER_IV))));

        return $response;
    }


    /**
     * Dencrypt a text string using the AES method
     *
     * @param string $text_encrypt
     * @return string
     */
    public function aesDecrypt($text_encrypt)
    {

        $CIPHER_KEY = getenv("KEY_AES_ENCRYPT");
        $OPENSSL_CIPHER_NAME = "AES-128-CBC";
        $CIPHER_KEY_LEN = 16;

        if (strlen($CIPHER_KEY) < $CIPHER_KEY_LEN) {
            $CIPHER_KEY = str_pad($CIPHER_KEY, $CIPHER_KEY_LEN, "0"); //0 pad to len 16
        } else if (strlen($CIPHER_KEY) > $CIPHER_KEY_LEN) {
            $CIPHER_KEY = substr($str = 0, 0, $CIPHER_KEY_LEN); //truncate to 16 bytes
        }

        $iv = base64_decode(json_decode(base64_decode($text_encrypt))->iv);
        $ciphertext = base64_decode(json_decode(base64_decode($text_encrypt))->ciphertext);
        $decryptedData = openssl_decrypt($ciphertext, $OPENSSL_CIPHER_NAME, $CIPHER_KEY, OPENSSL_RAW_DATA, $iv);
        return $decryptedData;
    }


    /**
     * Get Ip
     *
     * @return string
     */
    function getIp()
    {
        if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
            $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
            $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
        }
        $client  = @$_SERVER['HTTP_CLIENT_IP'];
        $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
        $remote  = $_SERVER['REMOTE_ADDR'];

        if (filter_var($client, FILTER_VALIDATE_IP)) {
            $ip = $client;
        } elseif (filter_var($forward, FILTER_VALIDATE_IP)) {
            $ip = $forward;
        } else {
            $ip = $remote;
        }

        return $ip;
    }


    /**
     * Uniq Id Custom
     *
     * @param integer $lenght
     * @return string
     */
    function uniqidCustom($lenght = 32)
    {
        // uniqid gives 13 chars, but you could adjust it to your needs.
        if (function_exists("random_bytes")) {
            $bytes = random_bytes(ceil($lenght / 2));
        } elseif (function_exists("openssl_random_pseudo_bytes")) {
            $bytes = openssl_random_pseudo_bytes(ceil($lenght / 2));
        } else {
            throw new Exception("no cryptographically secure random function available");
        }
        return substr(bin2hex($bytes), 0, $lenght);
    }


    /**
     * Get Exception
     *
     * @param exception $exception Exception result of try catch
     * @return array
     */
    function getException($exception)
    {
        return array("message" => $exception->getMessage(), "file" => $exception->getFile(), "line" => $exception->getLine());
    }


    /**
     * Validate the parameters or fields required
     *
     * @param Request $request
     * @param array $fields
     * @return boolean
     */
    function validateRequiredFields($request, $fields)
    {
        foreach ($fields as $field => $values) {
            if ($field == 'and') {
                foreach ($values as $value) {
                    if (!isset($request->$value) || $request->$value === "") {
                        $request->request->set('required_field', $value);
                        return false;
                    }
                }
                return true;
            } else if ($field == 'or') {
                $required = "";
                foreach ($values as $value) {
                    if (isset($request->$value) && $request->$value !== "") {
                        return true;
                    }
                    $required .= $value . "' or '";
                }
                $required = trim($required, "' or '");
                $request->request->set('required_field', $required);
                return false;
            }
        }
        return false;
    }

    /**
     * Get Execution time for a process
     *
     * @param mixed $start
     * @return integer
     */
    public function getExecutionTime($start)
    {
        return $start->diffInMilliseconds(Carbon::now()) / 1000;
    }

    /**
     * Genertate paginate for the response of the APIs
     *
     * @param object $items List of the items with the list of data
     * @return array
     */
    public function setCustomizePagination($items)
    {
        $data =  [
            'items' => $items->items(),
            'current_page' => $items->currentPage(),
            'per_page' => $items->nextPageUrl() ? $items->perPage() : $items->total(),
            'from' => $items->firstItem(),
            'to' => $items->lastItem(),
            'total' => $items->total(),
            'last_page' => $items->lastPage(),
            'next_page' => $items->nextPageUrl(),
        ];

        return $data;
    }

    /**
     * Generate a response general and standard with the description of the error code
     *
     * @param array $fields List of fields with the response of the API 
     *                      - [error_code]: error code generated to the end of the process in the functions.
     *                      - [data]: List of informatión obtained for the response.
     *                      - [function]: name of the function from which to call this function.
     *                      - [class]: name of the function from which to call this class.
     * @param array $dynamic_fields List of dynamic fields for the case where a response message contains variable data
     * @return void
     */
    public function setCustomizeResponse($fields, $dynamic_fields = array())
    {
        $error_code = $fields['error_code'];
        $code = $this->getErrorByCode($error_code);
        $message = $code['items'][0]->message;

        foreach ($dynamic_fields as $key => $value) {
            $message = str_replace('{' . $key . '}', $value, $message);
        }

        $message = str_replace('{required_field}', "'" . Request()->required_field . "'", $message);

        $status_code = $code['items'][0]->status_code;
        $code_app = $code['items'][0]->code_app;

        $response[] = array("message" => $message, "status" => $status_code, "code" => $error_code, "code_app" => $code_app, "data" => $fields['data']);
        $this->saveLog($fields['function'], $fields['class'], $response);
        return response()->json($response, $status_code);
    }


    /**
     * Parse an array into a paginated collection.
     *
     * @param Collection $collection The collection to paginate.
     * @param int $per_page The number of items to display per page (default: 15).
     * @return LengthAwarePaginator The paginated data.
     */
    public function parseArrayToPaginate(Collection $collection, $per_page = 200)
    {
        $request = Request();

        $page = $request->page ? $request->page : 1;

        $page_data = new LengthAwarePaginator(
            $collection->forPage($page, $per_page),
            $collection->count(),
            $per_page,
            $page,
            [
                'path' => LengthAwarePaginator::resolveCurrentPath(),
                'pageName' => 'page',
            ]
        );

        return $page_data;
    }


    // public function generateReferenceId()
    // {
    //     return date('Ymdhis') . $this->uniqidCustom(4);
    // }


    public function generateHash($text)
    {
        return hash("sha256", $text);
    }
}
