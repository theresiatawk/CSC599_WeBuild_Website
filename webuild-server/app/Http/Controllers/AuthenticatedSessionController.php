<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;

class AuthenticatedSessionController extends Controller
{
    // ...

    public function store(Request $request)
    {
        // ...

        if (! $user->hasVerifiedEmail()) {
            return $request->wantsJson()
                    ? abort(403, 'Your email address is not verified.')
                    : Redirect::route('verification.notice');
        }

        // ...
    }

    public function verify(Request $request): RedirectResponse
    {
        $request->user()->markEmailAsVerified();

        event(new Verified($request->user()));

        return Redirect::intended(config('fortify.home'));
    }
}

