<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }
    public function addEquipment(Request $request){
        $validator = Validator::make($request->all(), [
            'equipment_name' => 'required|string|max:100',
            'image' => 'required|mimes:jpeg,jpg,png',
            'price_per_hour' => 'required|string|max:100',
            'equipment_description' => 'required|string',
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()], 422);
        }
        $category = MaterialCategory::where("id", $request->category_id)
                                    ->first(); 
        if ($category === null) {
            return response()->json([
                'error' => 'Category Material not found. Invalid Category id'
            ], 404);
        }
        $material = new Material;
        $user_id = auth()->user()->id;
        $material->warehouse_id = $user_id;
        $material->category_id = $request->category_id;
        $material->name = $request->material_name;
        $material->price_per_unit = $request->price_per_unit;
        $material->available_quantity = $request->available_quantity;
        $material->description = $request->material_description;
        if($material->save()){
            return response()->json([
                'message' => 'Material successfully added',
            ], 201);
        }
        else{
            return response()->json([
                'error' => 'Failed to add the material',
            ], 422);
        }
    }
}
