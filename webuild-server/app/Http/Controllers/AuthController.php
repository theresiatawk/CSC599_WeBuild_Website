<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use App\Models\User;
use Validator;
use Illuminate\Support\Str;
use App\Mail\EmailVerification;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
        $this->middleware('checkUserOwnership', ['except' => ['login', 'register', 'logout', 'userProfile']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->createNewToken($token);
    }
    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|between:2,100|unique:users',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:8',
            'phone_number' => 'required|numeric|min:8',
            'adress' => 'required|string',
            'user_type' => 'required|string|in:u,w'
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()], 422);
        }
        $user = new User;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->phone_number = $request->phone_number;
        $user->adress = $request->adress;
        $user->user_type = $request->user_type;
        $tokenn = $this->generateVerificationToken();
        $user->save();
        $user->emailVerifications()->create([
            'token' => $tokenn,
        ]);
        $verification_url = 'http://127.0.0.1:8000/api/user/email/verify/'.$tokenn;
        Mail::to($user)->send(new EmailVerification($verification_url));
        return response()->json([
            'message' => 'Successfully registered. Please check your email to verify your account.'
        ], 201);
        if($user->save()){
            return response()->json([
                'message' => 'User successfully registered',
                'user' => $user
            ], 201);
        }
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile()
    {
        return response()->json(auth()->user());
    }
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'User Successfully logged out']);
    }
    public function editProfile(Request $request, $user){
        $validator = Validator::make($request->all(), [
            'username' => 'sometimes|string|between:2,100|unique:users,username,'.$user,
            'email' => 'sometimes|string|email|max:100|unique:users,email,'.$user,
            'phone_number' => 'sometimes|numeric|min:8',
            'adress' => 'sometimes|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);

        }
        $user = User::find($user);
        if($request->username){
            $user->username = $request->username;
        }
        if($request->email){
            $user->email = $request->email;
        }
        if($request->phone_number){
            $user->phone_number = $request->phone_number;
        }
        if($request->adress){
            $user->adress = $request->adress;
        }
        if($user->save()){
            return response()->json([
                'message' => 'User information updated successfully',
                'user' => $user,
            ], 201);
        }
    }
    public function updatePassword(Request $request, $user){
        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required|string|confirmed|min:8'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        $user = User::find($user);
        if (!password_verify($request->current_password, $user->password)) {
            return response()->json(['error' => 'Current password is incorrect.'], 401);
        }

        $user->password = bcrypt($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password updated successfully.'], 200);
    }

    
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() 
    {
        return $this->createNewToken(auth()->refresh());
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
    protected function generateVerificationToken(): string
{
    return Str::random(32);
}
}
