<?php


namespace App\Http\Controllers;
use App\Models\Order;
use App\Models\Material;
use App\Models\User;
use App\Models\Service;
use App\Models\Equipment;
use App\Models\MaterialCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Validator;

class OrderController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }
    public function orderMaterial(Request $request){
        $validator = Validator::make($request->all(), [
            'item_id' => 'required|integer',
            'warehouse_id' => 'required|integer',
            'quantity' => 'required|integer|gt:0',
            'latitude' =>  'required|numeric',
            'longitude' => 'required|numeric',
            'location_description'=>'required|string',
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }
        $order = new Order;
        $user_id = auth()->user()->id;
        $order->type='material';
        $order->user_id = $user_id;
        $material = Material::where("id", $request->item_id)
                                    ->first(); 
        if ($material === null) {
            return response()->json([
                'error' => 'Material not found. Invalid Item Id'
            ]);
        }
        $order->item_id = $request->item_id;
        $warehouse = User::where("id", $request->warehouse_id)
        ->first(); 
        if($warehouse === null){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        if($warehouse->user_type !== 'w'){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        $order->warehouse_id = $request->warehouse_id;
        $order->latitude = $request->latitude;
        $order->longtitude = $request->longitude;
        $order->location_description = $request->location_description;
        $order->state = 'pending';
        if($material->available_quantity < $request->quantity){
            return response()->json([
                'error' => 'The Stock does not have this quantity of the chosen material.'
            ]);
        }
        $new_quantity_avaialble = $material->available_quantity - $request->quantity;
        $order->quantity = $request->quantity;
        $price = $material->price_per_unit * $request->quantity;
        $order->price = $price;
        if($order->save()){
            $material->available_quantity = $new_quantity_avaialble;
            if($material->save()){
                return response()->json([
                    'message' => 'Order successfully sent',
                ], 201);
            }
        }
        else{
            return response()->json([
                'error' => 'Failed to send the order',
            ]);
        }
    }
    public function orderService(Request $request){
        $validator = Validator::make($request->all(), [
            'item_id' => 'required|integer',
            'warehouse_id' => 'required|integer',
            'date' => 'required|date|date_format:Y-m-d',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'price' => 'required|integer',
            'latitude' =>  'required|numeric',
            'longitude' => 'required|numeric',
            'location_description' => 'required|string',
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }
        $order = new Order;
        $user_id = auth()->user()->id;
        $order->type='service';
        $order->user_id = $user_id;
        $service = Service::where("id", $request->item_id)
                                    ->first(); 
        if ($service === null) {
            return response()->json([
                'error' => 'Service not found. Invalid Item Id'
            ]);
        }
        $order->item_id = $request->item_id;
        $order->date = $request->date;
        $order->start_time = $request->start_time;
        $order->end_time = $request->end_time;
        $order->price = $request->price;
        $warehouse = User::where("id", $request->warehouse_id)
        ->first(); 
        if($warehouse === null){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        if($warehouse->user_type !== 'w'){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        $order->warehouse_id = $request->warehouse_id;
        $order->latitude = $request->latitude;
        $order->longtitude = $request->longitude;
        $order->location_description = $request->location_description;
        $order->state = 'pending';
        if($order->save()){
            return response()->json([
                'message' => 'Order successfully sent',
            ], 201);
        }
        else{
            return response()->json([
                'error' => 'Failed to send the order',
            ]);
        }
    }
    public function orderEquipment(Request $request){
        $validator = Validator::make($request->all(), [
            'item_id' => 'required|integer',
            'warehouse_id' => 'required|integer',
            'date' => 'required|date|date_format:Y-m-d',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'price' => 'required|integer',
            'latitude' =>  'required|numeric',
            'longitude' => 'required|numeric',
            'location_description' => 'required|string',
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }
        $order = new Order;
        $user_id = auth()->user()->id;
        $order->type='equipment';
        $order->user_id = $user_id;
        $equipment = Equipment::where("id", $request->item_id)
                                    ->first(); 
        if ($equipment === null) {
            return response()->json([
                'error' => 'Equipment not found. Invalid Item Id'
            ]);
        }
        $order->item_id = $request->item_id;
        $order->date = $request->date;
        $order->start_time = $request->start_time;
        $order->end_time = $request->end_time;
        $order->price = $request->price;
        $warehouse = User::where("id", $request->warehouse_id)
        ->first(); 
        if($warehouse === null){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        if($warehouse->user_type !== 'w'){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        $order->warehouse_id = $request->warehouse_id;
        $order->latitude = $request->latitude;
        $order->longtitude = $request->longitude;
        $order->location_description = $request->location_description;
        $order->state = 'pending';
        if($order->save()){
            return response()->json([
                'message' => 'Order successfully sent',
            ], 201);
        }
        else{
            return response()->json([
                'error' => 'Failed to send the order',
            ]);
        }
    }
    public function getOrdersForWarehouseForDate(Request $request){
        $validator = Validator::make($request->all(), [
            'type' => 'required|in:material,service,equipment',
            'warehouse_id' => 'required|integer',
            'item_id' => 'required|integer',
            'date' => 'required|date|date_format:Y-m-d',
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }
        $bookings = Order::where("type", $request->type)
                        ->where("item_id", $request->item_id)
                        ->where("warehouse_id",$request->warehouse_id)
                        ->where("date",$request->date)
                        ->whereNotIn('state', ['canceled'])
                        ->get(); 
        if($bookings){
            if(count($bookings) > 0){
                return response()->json([
                    'message' => 'avaialble',
                    'bookings' => $bookings
                ]);
            }
            return response()->json([
                'error' => 'No Bookings on this day for this material',
            ]);
        }
    }
    public function getOrdersForWarehouse(){
        $warehouse = auth()->user();
        $warehouse_id = Auth::id(); 
        $warehouse = User::where("id", $warehouse_id)
        ->first(); 
        if($warehouse === null){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        if($warehouse->user_type !== 'w'){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        $orders = Order::join('users', 'orders.user_id', '=', 'users.id')
                                ->leftJoin('materials', function ($join) {
                                    $join->on('orders.item_id', '=', 'materials.id')
                                        ->where('orders.type', '=', 'material');
                                })
                                ->leftJoin('equipment', function ($join) {
                                    $join->on('orders.item_id', '=', 'equipment.id')
                                        ->where('orders.type', '=', 'equipment');
                                })
                                ->leftJoin('services', function ($join) {
                                    $join->on('orders.item_id', '=', 'services.id')
                                        ->where('orders.type', '=', 'service');
                                })
                                ->where('orders.warehouse_id', $warehouse_id)
                                ->select(
                                    'orders.id',
                                    'orders.type',
                                    'orders.price',
                                    'orders.quantity',
                                    'orders.latitude',
                                    'orders.longtitude',
                                    'orders.location_description',
                                    'orders.date',
                                    'orders.start_time',
                                    'orders.end_time',
                                    'users.username',
                                    'users.email',
                                    'users.phone_number',
                                    'materials.name as material_name',
                                    'materials.price_per_unit',
                                    'equipment.name as equipment_name',
                                    'equipment.price_per_hour',
                                    'services.name as service_name',
                                    'services.minimum_charge_per_hour'
                                )
                                ->get();
                                if(count($orders) > 0){
                                    return response()->json([
                                        'message' => 'avaialble',
                                        'orders' => $orders
                                    ]);
                                }
                                return response()->json([
                                    'error' => 'No Orders',
                                ]);
    }
    public function getOrdersForWarehouseCanceled(){
        $warehouse = auth()->user();
        $warehouse_id = Auth::id(); 
        $warehouse = User::where("id", $warehouse_id)
        ->first(); 
        if($warehouse === null){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        if($warehouse->user_type !== 'w'){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        $orders = Order::join('users', 'orders.user_id', '=', 'users.id')
                                ->leftJoin('materials', function ($join) {
                                    $join->on('orders.item_id', '=', 'materials.id')
                                        ->where('orders.type', '=', 'material');
                                })
                                ->leftJoin('equipment', function ($join) {
                                    $join->on('orders.item_id', '=', 'equipment.id')
                                        ->where('orders.type', '=', 'equipment');
                                })
                                ->leftJoin('services', function ($join) {
                                    $join->on('orders.item_id', '=', 'services.id')
                                        ->where('orders.type', '=', 'service');
                                })
                                ->where('orders.warehouse_id', $warehouse_id)
                                ->where('orders.state','canceled')
                                ->select(
                                    'orders.id',
                                    'orders.type',
                                    'orders.price',
                                    'orders.quantity',
                                    'orders.latitude',
                                    'orders.longtitude',
                                    'orders.location_description',
                                    'orders.date',
                                    'orders.start_time',
                                    'orders.end_time',
                                    'users.username',
                                    'users.email',
                                    'users.phone_number',
                                    'materials.name as material_name',
                                    'materials.price_per_unit',
                                    'equipment.name as equipment_name',
                                    'equipment.price_per_hour',
                                    'services.name as service_name',
                                    'services.minimum_charge_per_hour'
                                )
                                ->get();
                                if(count($orders) > 0){
                                    return response()->json([
                                        'message' => 'avaialble',
                                        'orders' => $orders
                                    ]);
                                }
                                return response()->json([
                                    'error' => 'No Orders',
                                ]);
    }
    public function getOrdersForWarehousePending(){
        $warehouse = auth()->user();
        $warehouse_id = Auth::id(); 
        $warehouse = User::where("id", $warehouse_id)
        ->first(); 
        if($warehouse === null){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        if($warehouse->user_type !== 'w'){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        $orders = Order::join('users', 'orders.user_id', '=', 'users.id')
                                ->leftJoin('materials', function ($join) {
                                    $join->on('orders.item_id', '=', 'materials.id')
                                        ->where('orders.type', '=', 'material');
                                })
                                ->leftJoin('equipment', function ($join) {
                                    $join->on('orders.item_id', '=', 'equipment.id')
                                        ->where('orders.type', '=', 'equipment');
                                })
                                ->leftJoin('services', function ($join) {
                                    $join->on('orders.item_id', '=', 'services.id')
                                        ->where('orders.type', '=', 'service');
                                })
                                ->where('orders.warehouse_id', $warehouse_id)
                                ->where('orders.state','pending')
                                ->select(
                                    'orders.id',
                                    'orders.type',
                                    'orders.price',
                                    'orders.quantity',
                                    'orders.latitude',
                                    'orders.longtitude',
                                    'orders.location_description',
                                    'orders.date',
                                    'orders.start_time',
                                    'orders.end_time',
                                    'users.username',
                                    'users.email',
                                    'users.phone_number',
                                    'materials.name as material_name',
                                    'materials.price_per_unit',
                                    'equipment.name as equipment_name',
                                    'equipment.price_per_hour',
                                    'services.name as service_name',
                                    'services.minimum_charge_per_hour'
                                )
                                ->get();
                                if(count($orders) > 0){
                                    return response()->json([
                                        'message' => 'avaialble',
                                        'orders' => $orders
                                    ]);
                                }
                                return response()->json([
                                    'error' => 'No Orders',
                                ]);
    }
    public function getOrdersForWarehouseComplete(){
        $warehouse = auth()->user();
        $warehouse_id = Auth::id(); 
        $warehouse = User::where("id", $warehouse_id)
        ->first(); 
        if($warehouse === null){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        if($warehouse->user_type !== 'w'){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        $orders = Order::join('users', 'orders.user_id', '=', 'users.id')
                                ->leftJoin('materials', function ($join) {
                                    $join->on('orders.item_id', '=', 'materials.id')
                                        ->where('orders.type', '=', 'material');
                                })
                                ->leftJoin('equipment', function ($join) {
                                    $join->on('orders.item_id', '=', 'equipment.id')
                                        ->where('orders.type', '=', 'equipment');
                                })
                                ->leftJoin('services', function ($join) {
                                    $join->on('orders.item_id', '=', 'services.id')
                                        ->where('orders.type', '=', 'service');
                                })
                                ->where('orders.warehouse_id', $warehouse_id)
                                ->where('orders.state','completed')
                                ->select(
                                    'orders.id',
                                    'orders.type',
                                    'orders.price',
                                    'orders.quantity',
                                    'orders.latitude',
                                    'orders.longtitude',
                                    'orders.location_description',
                                    'orders.date',
                                    'orders.start_time',
                                    'orders.end_time',
                                    'users.username',
                                    'users.email',
                                    'users.phone_number',
                                    'materials.name as material_name',
                                    'materials.price_per_unit',
                                    'equipment.name as equipment_name',
                                    'equipment.price_per_hour',
                                    'services.name as service_name',
                                    'services.minimum_charge_per_hour'
                                )
                                ->get();
                                if(count($orders) > 0){
                                    return response()->json([
                                        'message' => 'avaialble',
                                        'orders' => $orders
                                    ]);
                                }
                                return response()->json([
                                    'error' => 'No Orders',
                                ]);
    }
    public function getOrdersForWarehouseMaterial(){
        $warehouse = auth()->user();
        $warehouse_id = Auth::id(); 
        $warehouse = User::where("id", $warehouse_id)
        ->first(); 
        if($warehouse === null){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        if($warehouse->user_type !== 'w'){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        $orders = Order::join('users', 'orders.user_id', '=', 'users.id')
                                ->leftJoin('materials', function ($join) {
                                    $join->on('orders.item_id', '=', 'materials.id')
                                        ->where('orders.type', '=', 'material');
                                })
                                ->leftJoin('equipment', function ($join) {
                                    $join->on('orders.item_id', '=', 'equipment.id')
                                        ->where('orders.type', '=', 'equipment');
                                })
                                ->leftJoin('services', function ($join) {
                                    $join->on('orders.item_id', '=', 'services.id')
                                        ->where('orders.type', '=', 'service');
                                })
                                ->where('orders.warehouse_id', $warehouse_id)
                                ->where('orders.type','material')
                                ->select(
                                    'orders.id',
                                    'orders.type',
                                    'orders.price',
                                    'orders.quantity',
                                    'orders.latitude',
                                    'orders.longtitude',
                                    'orders.location_description',
                                    'orders.date',
                                    'orders.start_time',
                                    'orders.end_time',
                                    'users.username',
                                    'users.email',
                                    'users.phone_number',
                                    'materials.name as material_name',
                                    'materials.price_per_unit',
                                    'equipment.name as equipment_name',
                                    'equipment.price_per_hour',
                                    'services.name as service_name',
                                    'services.minimum_charge_per_hour'
                                )
                                ->get();
                                if(count($orders) > 0){
                                    return response()->json([
                                        'message' => 'avaialble',
                                        'orders' => $orders
                                    ]);
                                }
                                return response()->json([
                                    'error' => 'No Orders',
                                ]);
    }
    public function getOrdersForWarehouseService(){
        $warehouse = auth()->user();
        $warehouse_id = Auth::id(); 
        $warehouse = User::where("id", $warehouse_id)
        ->first(); 
        if($warehouse === null){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        if($warehouse->user_type !== 'w'){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        $orders = Order::join('users', 'orders.user_id', '=', 'users.id')
                                ->leftJoin('materials', function ($join) {
                                    $join->on('orders.item_id', '=', 'materials.id')
                                        ->where('orders.type', '=', 'material');
                                })
                                ->leftJoin('equipment', function ($join) {
                                    $join->on('orders.item_id', '=', 'equipment.id')
                                        ->where('orders.type', '=', 'equipment');
                                })
                                ->leftJoin('services', function ($join) {
                                    $join->on('orders.item_id', '=', 'services.id')
                                        ->where('orders.type', '=', 'service');
                                })
                                ->where('orders.warehouse_id', $warehouse_id)
                                ->where('orders.type','service')
                                ->select(
                                    'orders.id',
                                    'orders.type',
                                    'orders.price',
                                    'orders.quantity',
                                    'orders.latitude',
                                    'orders.longtitude',
                                    'orders.location_description',
                                    'orders.date',
                                    'orders.start_time',
                                    'orders.end_time',
                                    'users.username',
                                    'users.email',
                                    'users.phone_number',
                                    'materials.name as material_name',
                                    'materials.price_per_unit',
                                    'equipment.name as equipment_name',
                                    'equipment.price_per_hour',
                                    'services.name as service_name',
                                    'services.minimum_charge_per_hour'
                                )
                                ->get();
                                if(count($orders) > 0){
                                    return response()->json([
                                        'message' => 'avaialble',
                                        'orders' => $orders
                                    ]);
                                }
                                return response()->json([
                                    'error' => 'No Orders',
                                ]);
    }
    public function getOrdersForWarehouseEquipment(){
        $warehouse = auth()->user();
        $warehouse_id = Auth::id(); 
        $warehouse = User::where("id", $warehouse_id)
        ->first(); 
        if($warehouse === null){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        if($warehouse->user_type !== 'w'){
            return response()->json([
                'error' => 'Warehouse not found. Invalid Warehouse Id'
            ]);
        }
        $orders = Order::join('users', 'orders.user_id', '=', 'users.id')
                                ->leftJoin('materials', function ($join) {
                                    $join->on('orders.item_id', '=', 'materials.id')
                                        ->where('orders.type', '=', 'material');
                                })
                                ->leftJoin('equipment', function ($join) {
                                    $join->on('orders.item_id', '=', 'equipment.id')
                                        ->where('orders.type', '=', 'equipment');
                                })
                                ->leftJoin('services', function ($join) {
                                    $join->on('orders.item_id', '=', 'services.id')
                                        ->where('orders.type', '=', 'service');
                                })
                                ->where('orders.warehouse_id', $warehouse_id)
                                ->where('orders.type','equipment')
                                ->select(
                                    'orders.id',
                                    'orders.type',
                                    'orders.price',
                                    'orders.quantity',
                                    'orders.latitude',
                                    'orders.longtitude',
                                    'orders.location_description',
                                    'orders.date',
                                    'orders.start_time',
                                    'orders.end_time',
                                    'users.username',
                                    'users.email',
                                    'users.phone_number',
                                    'materials.name as material_name',
                                    'materials.price_per_unit',
                                    'equipment.name as equipment_name',
                                    'equipment.price_per_hour',
                                    'services.name as service_name',
                                    'services.minimum_charge_per_hour'
                                )
                                ->get();
                                if(count($orders) > 0){
                                    return response()->json([
                                        'message' => 'avaialble',
                                        'orders' => $orders
                                    ]);
                                }
                                return response()->json([
                                    'error' => 'No Orders',
                                ]);
    }
    public function getOrdersForUser(){
        $user = auth()->user();
        $user_id = Auth::id(); 
        if($user === null){
            return response()->json([
                'error' => 'User not found. Invalid User Id'
            ]);
        }
        $orders = Order::join('users', 'orders.warehouse_id', '=', 'users.id')
                                ->leftJoin('materials', function ($join) {
                                    $join->on('orders.item_id', '=', 'materials.id')
                                        ->where('orders.type', '=', 'material');
                                })
                                ->leftJoin('equipment', function ($join) {
                                    $join->on('orders.item_id', '=', 'equipment.id')
                                        ->where('orders.type', '=', 'equipment');
                                })
                                ->leftJoin('services', function ($join) {
                                    $join->on('orders.item_id', '=', 'services.id')
                                        ->where('orders.type', '=', 'service');
                                })
                                ->where('orders.user_id', $user_id)
                                ->select(
                                    'orders.id',
                                    'orders.type',
                                    'orders.price',
                                    'orders.quantity',
                                    'orders.latitude',
                                    'orders.longtitude',
                                    'orders.location_description',
                                    'orders.date',
                                    'orders.start_time',
                                    'orders.end_time',
                                    'users.username',
                                    'users.email',
                                    'users.phone_number',
                                    'materials.name as material_name',
                                    'materials.price_per_unit',
                                    'equipment.name as equipment_name',
                                    'equipment.price_per_hour',
                                    'services.name as service_name',
                                    'services.minimum_charge_per_hour'
                                )
                                ->get();
                                if(count($orders) > 0){
                                    return response()->json([
                                        'message' => 'avaialble',
                                        'orders' => $orders
                                    ]);
                                }
                                return response()->json([
                                    'error' => 'No Orders',
                                ]);
    }
    public function getOrdersForUserCanceled(){
        $user = auth()->user();
        $user_id = Auth::id(); 
        if($user === null){
            return response()->json([
                'error' => 'User not found. Invalid User Id'
            ]);
        }
        $orders = Order::join('users', 'orders.warehouse_id', '=', 'users.id')
                                ->leftJoin('materials', function ($join) {
                                    $join->on('orders.item_id', '=', 'materials.id')
                                        ->where('orders.type', '=', 'material');
                                })
                                ->leftJoin('equipment', function ($join) {
                                    $join->on('orders.item_id', '=', 'equipment.id')
                                        ->where('orders.type', '=', 'equipment');
                                })
                                ->leftJoin('services', function ($join) {
                                    $join->on('orders.item_id', '=', 'services.id')
                                        ->where('orders.type', '=', 'service');
                                })
                                ->where('orders.user_id', $user_id)
                                ->where('orders.state', 'canceled')
                                ->select(
                                    'orders.id',
                                    'orders.type',
                                    'orders.price',
                                    'orders.quantity',
                                    'orders.latitude',
                                    'orders.longtitude',
                                    'orders.location_description',
                                    'orders.date',
                                    'orders.start_time',
                                    'orders.end_time',
                                    'users.username',
                                    'users.email',
                                    'users.phone_number',
                                    'materials.name as material_name',
                                    'materials.price_per_unit',
                                    'equipment.name as equipment_name',
                                    'equipment.price_per_hour',
                                    'services.name as service_name',
                                    'services.minimum_charge_per_hour'
                                )
                                ->get();
                                if(count($orders) > 0){
                                    return response()->json([
                                        'message' => 'avaialble',
                                        'orders' => $orders
                                    ]);
                                }
                                return response()->json([
                                    'error' => 'No Orders',
                                ]);
    }
    public function getOrdersForUserPending(){
        $user = auth()->user();
        $user_id = Auth::id(); 
        if($user === null){
            return response()->json([
                'error' => 'User not found. Invalid User Id'
            ]);
        }
        $orders = Order::join('users', 'orders.warehouse_id', '=', 'users.id')
                                ->leftJoin('materials', function ($join) {
                                    $join->on('orders.item_id', '=', 'materials.id')
                                        ->where('orders.type', '=', 'material');
                                })
                                ->leftJoin('equipment', function ($join) {
                                    $join->on('orders.item_id', '=', 'equipment.id')
                                        ->where('orders.type', '=', 'equipment');
                                })
                                ->leftJoin('services', function ($join) {
                                    $join->on('orders.item_id', '=', 'services.id')
                                        ->where('orders.type', '=', 'service');
                                })
                                ->where('orders.user_id', $user_id)
                                ->where('orders.state', 'pending')
                                ->select(
                                    'orders.id',
                                    'orders.type',
                                    'orders.price',
                                    'orders.quantity',
                                    'orders.latitude',
                                    'orders.longtitude',
                                    'orders.location_description',
                                    'orders.date',
                                    'orders.start_time',
                                    'orders.end_time',
                                    'users.username',
                                    'users.email',
                                    'users.phone_number',
                                    'materials.name as material_name',
                                    'materials.price_per_unit',
                                    'equipment.name as equipment_name',
                                    'equipment.price_per_hour',
                                    'services.name as service_name',
                                    'services.minimum_charge_per_hour'
                                )
                                ->get();
                                if(count($orders) > 0){
                                    return response()->json([
                                        'message' => 'avaialble',
                                        'orders' => $orders
                                    ]);
                                }
                                return response()->json([
                                    'error' => 'No Orders',
                                ]);
    }
    public function getOrdersForUserComplete(){
        $user = auth()->user();
        $user_id = Auth::id(); 
        if($user === null){
            return response()->json([
                'error' => 'User not found. Invalid User Id'
            ]);
        }
        $orders = Order::join('users', 'orders.warehouse_id', '=', 'users.id')
                                ->leftJoin('materials', function ($join) {
                                    $join->on('orders.item_id', '=', 'materials.id')
                                        ->where('orders.type', '=', 'material');
                                })
                                ->leftJoin('equipment', function ($join) {
                                    $join->on('orders.item_id', '=', 'equipment.id')
                                        ->where('orders.type', '=', 'equipment');
                                })
                                ->leftJoin('services', function ($join) {
                                    $join->on('orders.item_id', '=', 'services.id')
                                        ->where('orders.type', '=', 'service');
                                })
                                ->where('orders.user_id', $user_id)
                                ->where('orders.state', 'completed')
                                ->select(
                                    'orders.id',
                                    'orders.type',
                                    'orders.price',
                                    'orders.quantity',
                                    'orders.latitude',
                                    'orders.longtitude',
                                    'orders.location_description',
                                    'orders.date',
                                    'orders.start_time',
                                    'orders.end_time',
                                    'users.username',
                                    'users.email',
                                    'users.phone_number',
                                    'materials.name as material_name',
                                    'materials.price_per_unit',
                                    'equipment.name as equipment_name',
                                    'equipment.price_per_hour',
                                    'services.name as service_name',
                                    'services.minimum_charge_per_hour'
                                )
                                ->get();
                                if(count($orders) > 0){
                                    return response()->json([
                                        'message' => 'avaialble',
                                        'orders' => $orders
                                    ]);
                                }
                                return response()->json([
                                    'error' => 'No Orders',
                                ]);
    }
    public function getOrdersForUserMaterial(){
        $user = auth()->user();
        $user_id = Auth::id(); 
        if($user === null){
            return response()->json([
                'error' => 'User not found. Invalid User Id'
            ]);
        }
        $orders = Order::join('users', 'orders.warehouse_id', '=', 'users.id')
                                ->leftJoin('materials', function ($join) {
                                    $join->on('orders.item_id', '=', 'materials.id')
                                        ->where('orders.type', '=', 'material');
                                })
                                ->leftJoin('equipment', function ($join) {
                                    $join->on('orders.item_id', '=', 'equipment.id')
                                        ->where('orders.type', '=', 'equipment');
                                })
                                ->leftJoin('services', function ($join) {
                                    $join->on('orders.item_id', '=', 'services.id')
                                        ->where('orders.type', '=', 'service');
                                })
                                ->where('orders.user_id', $user_id)
                                ->where('orders.type','material')
                                ->select(
                                    'orders.id',
                                    'orders.type',
                                    'orders.price',
                                    'orders.quantity',
                                    'orders.latitude',
                                    'orders.longtitude',
                                    'orders.location_description',
                                    'orders.date',
                                    'orders.start_time',
                                    'orders.end_time',
                                    'users.username',
                                    'users.email',
                                    'users.phone_number',
                                    'materials.name as material_name',
                                    'materials.price_per_unit',
                                    'equipment.name as equipment_name',
                                    'equipment.price_per_hour',
                                    'services.name as service_name',
                                    'services.minimum_charge_per_hour'
                                )
                                ->get();
                                if(count($orders) > 0){
                                    return response()->json([
                                        'message' => 'avaialble',
                                        'orders' => $orders
                                    ]);
                                }
                                return response()->json([
                                    'error' => 'No Orders',
                                ]);
    }
    public function getOrdersForUserService(){
        $user = auth()->user();
        $user_id = Auth::id(); 
        if($user === null){
            return response()->json([
                'error' => 'User not found. Invalid User Id'
            ]);
        }
        $orders = Order::join('users', 'orders.warehouse_id', '=', 'users.id')
                                ->leftJoin('materials', function ($join) {
                                    $join->on('orders.item_id', '=', 'materials.id')
                                        ->where('orders.type', '=', 'material');
                                })
                                ->leftJoin('equipment', function ($join) {
                                    $join->on('orders.item_id', '=', 'equipment.id')
                                        ->where('orders.type', '=', 'equipment');
                                })
                                ->leftJoin('services', function ($join) {
                                    $join->on('orders.item_id', '=', 'services.id')
                                        ->where('orders.type', '=', 'service');
                                })
                                ->where('orders.user_id', $user_id)
                                ->where('orders.type','service')
                                ->select(
                                    'orders.id',
                                    'orders.type',
                                    'orders.price',
                                    'orders.quantity',
                                    'orders.latitude',
                                    'orders.longtitude',
                                    'orders.location_description',
                                    'orders.date',
                                    'orders.start_time',
                                    'orders.end_time',
                                    'users.username',
                                    'users.email',
                                    'users.phone_number',
                                    'materials.name as material_name',
                                    'materials.price_per_unit',
                                    'equipment.name as equipment_name',
                                    'equipment.price_per_hour',
                                    'services.name as service_name',
                                    'services.minimum_charge_per_hour'
                                )
                                ->get();
                                if(count($orders) > 0){
                                    return response()->json([
                                        'message' => 'avaialble',
                                        'orders' => $orders
                                    ]);
                                }
                                return response()->json([
                                    'error' => 'No Orders',
                                ]);
    }
    public function getOrdersForUserEquipment(){
        $user = auth()->user();
        $user_id = Auth::id(); 
        if($user === null){
            return response()->json([
                'error' => 'User not found. Invalid User Id'
            ]);
        }
        $orders = Order::join('users', 'orders.warehouse_id', '=', 'users.id')
                                ->leftJoin('materials', function ($join) {
                                    $join->on('orders.item_id', '=', 'materials.id')
                                        ->where('orders.type', '=', 'material');
                                })
                                ->leftJoin('equipment', function ($join) {
                                    $join->on('orders.item_id', '=', 'equipment.id')
                                        ->where('orders.type', '=', 'equipment');
                                })
                                ->leftJoin('services', function ($join) {
                                    $join->on('orders.item_id', '=', 'services.id')
                                        ->where('orders.type', '=', 'service');
                                })
                                ->where('orders.user_id', $user_id)
                                ->where('orders.type', 'equipment')
                                ->select(
                                    'orders.id',
                                    'orders.type',
                                    'orders.price',
                                    'orders.quantity',
                                    'orders.latitude',
                                    'orders.longtitude',
                                    'orders.location_description',
                                    'orders.date',
                                    'orders.start_time',
                                    'orders.end_time',
                                    'users.username',
                                    'users.email',
                                    'users.phone_number',
                                    'materials.name as material_name',
                                    'materials.price_per_unit',
                                    'equipment.name as equipment_name',
                                    'equipment.price_per_hour',
                                    'services.name as service_name',
                                    'services.minimum_charge_per_hour'
                                )
                                ->get();
                                if(count($orders) > 0){
                                    return response()->json([
                                        'message' => 'avaialble',
                                        'orders' => $orders
                                    ]);
                                }
                                return response()->json([
                                    'error' => 'No Orders',
                                ]);
    }
    public function changeOrderStatus($order_id, $status){
        $order = Order::where("id", $order_id)->first(); 
        if($order === null) {
            return response()->json([
                'error' => 'Order Not Found.',
            ]);
        }
        if (!in_array($status, ['pending', 'completed', 'canceled'])) {
            return response()->json([
                'error' => 'Invalid Status',
            ]);
        }
        $order->state = $status;
        if($order->save()){
            return response()->json([
                'message' => 'Order Status Updated',
            ]);
        }
        else{
            return response()->json([
                'error' => 'Failed.Try Again',
            ]);
        }
    }
    public function deleteOrder($order_id){
        $warehouse = auth()->user();
        $warehouse_id = Auth::id(); 
        if($warehouse === null){
            return response()->json([
                'error' => 'User not found.'
            ]);
        }
        $order = Order::where("id", $order_id)->first(); 
        if($order === null) {
            return response()->json([
                'error' => 'Order Not Found.',
            ]);
        }
        if($order->warehouse_id !== $warehouse_id){
            return response()->json([
                'error' => 'Unauthorized',
            ]);
        }
        if($order->delete()){
            return response()->json([
                'message' => 'Order deleted successfully'
            ]);
        }
        else{
            return response()->json([
                'error' => 'Failed to delete the order.'
            ]);
        }
    }

}
