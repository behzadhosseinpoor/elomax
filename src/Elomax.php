<?php

namespace Laravel\Elomax;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;

class Elomax
{
    /**
     * The callback that should be used to authenticate Elomax users.
     *
     * @var Closure
     */
    public static $authUsing;

    /**
     * Register the Elomax authentication callback.
     *
     * @param Closure $callback
     * @return static
     */
    public static function auth(Closure $callback): Elomax
    {
        static::$authUsing = $callback;

        return new static;
    }

    /**
     * Determine if the given request can access the Elomax dashboard.
     *
     * @param Request $request
     * @return bool
     */
    public static function check(Request $request): bool
    {
        return (static::$authUsing ?: function () {
            return App::isLocal();
        })($request);
    }

    /**
     * Get the default JavaScript variables for Elomax.
     *
     * @return array
     */
    public static function scriptVariables(): array
    {
        return [
            'path' => Config::get('elomax.path'),
            'caches' => array_keys(Config::get('cache.stores')),
            'cache' => Config::get('cache.default'),
        ];
    }
}
