<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use App\Models\EmailVerification;
use App\Models\User;


class VerificationController extends Controller
{
    public function show()
    {
        return view('verify-email');
    }

    public function verify($token)
    {
        $verification = EmailVerification::where('token', $token)->first();

        if (!$verification) {
            abort(404);
        }

        $user_id = $verification->user_id;
        $user = User::find($user_id);
        if ($user->email_verified) {
            return Redirect::to('/');
        }

        $user->email_verified = true;
        $user->save();

        $verification->delete();

        Auth::login($user);

        return Redirect::to('/login');
    }

    public function resend()
    {
        $user = Auth::user();

        $token = $this->generateVerificationToken();

        $user->emailVerifications()->create([
            'token' => $token,
        ]);

        Mail::to($user)->send(new EmailVerification($token));

        return back()->with('success', 'Verification email sent!');
    }
}
