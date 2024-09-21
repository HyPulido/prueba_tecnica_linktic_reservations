<?php

namespace App\Http\Middleware;

use App\Utilities\BaseApp;
use Closure;
use Exception;
use Illuminate\Contracts\Auth\Factory as Auth;
use Illuminate\Support\Facades\Auth as AuthUser;

class AuthenticateMiddleware
{

    use BaseApp;
    /**
     * The authentication guard factory instance.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    protected $auth;

    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if ($this->auth->guard($guard)->guest()) {
            $error_code = 'AEHE401';
            return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => null, 'function' => __FUNCTION__, 'class' => __CLASS__));
        }
        return $next($request);
    }
}
