<?php

namespace Laravel\Elomax\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Laravel\Elomax\Elomax;

class Authorize
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return Response|void
     */
    public function handle(Request $request, Closure $next)
    {
        return Elomax::check($request) ? $next($request) : abort(403);
    }
}