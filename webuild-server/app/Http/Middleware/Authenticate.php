<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Closure;

class Authenticate extends Middleware
{
    public function handle($request, Closure $next, ...$guards)
    {
        $user = $request->user();
        if(! $user){
            return response()->json([
                'error' => 'Unauthenticated'
            ], 401);
        }
        return $next($request);
    }
}
