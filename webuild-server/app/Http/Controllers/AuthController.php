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
    public function __construct(){
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Incorrect email or password'], 401);
        }
        return $this->createNewToken($token);
    }

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
    }

    public function userProfile(){
        return response()->json(auth()->user());
    }

    public function logout(){
        auth()->logout();
        return response()->json(['message' => 'User Successfully logged out']);
    }

    public function editProfile(Request $request){
        $user_id = auth()->user()->id;
        $validator = Validator::make($request->all(), [
            'username' => 'sometimes|string|between:2,100|unique:users,username,'.$user_id,
            'email' => 'sometimes|string|email|max:100|unique:users,email,'.$user_id,
            'phone_number' => 'sometimes|numeric|min:8',
            'adress' => 'sometimes|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        $user_id = auth()->user()->id;
        $user = User::find($user_id);
        if($user == null){
            return response()->json([
                'error' => 'User not found. Invalid User Id.'
            ], 404);
        }
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
        if($user->save()){
            return response()->json(['message' => 'Password updated successfully.'], 200);
        }
        else{
            return response()->json(['error' => 'Failed to update password, try again later.'], 200);
        }
    }

    public function resetPassword(Request $request){
        // TODO: Implement password reset logic
    }

    public function getWarehouses(){
        $warehouses = User::where("user_type", 'w')
                            ->get();
        if(count($warehouses) == 0){
            return response()->json([
                'error' => 'No Warehouses registered yet'
            ]);
        }
        return response()->json([
            'message' => 'Available',
            'Warehouses' => $warehouses
        ]); 
    }

    public function getUsers(){
        $users = User::where("user_type", 'u')
                            ->get();
        if(count($users) == 0){
            return response()->json([
                'error' => 'No Users registered yet'
            ]);
        }
        return response()->json([
            'message' => 'Available',
            'Users' => $users
        ]); 
    }

    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }

    protected function createNewToken($token){
        if (auth()->user()->email_verified != 0){
            return response()->json([
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60,
                'user' => auth()->user(),
            ]);
        }
        else{
            return response()->json([
                'error' => 'Email verification is needed in order to be able to sign in'
            ]);
        }
    }

    protected function generateVerificationToken(): string{
        return Str::random(32);
    }
}
