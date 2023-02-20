<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\WarehouseOwner;
use Validator;

class WarehouseOwnerController extends Controller
{
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'warehouse_name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
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
            'warehouse_name' => 'required|string|between:2,100|unique:warehouse_owners',
            'email' => 'required|string|email|max:100|unique:warehouse_owners',
            'password' => 'required|string|confirmed|min:8',
            'phone_number' => 'required|numeric|min:8',
            'adress' => 'required'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $warehouse_owner = new WarehouseOwner;
        $warehouse_owner->warehouse_name = $request->warehouse_name;
        $warehouse_owner->email = $request->email;
        $warehouse_owner->password = bcrypt($request->password);
        $warehouse_owner->phone_number = $request->phone_number;
        $warehouse_owner->adress = $request->adress;
        if($warehouse_owner->save()){
            return response()->json([
                'message' => 'Warehouse successfully registered',
                'warehouse' => $warehouse_owner
            ], 201);
        }
    }
}
