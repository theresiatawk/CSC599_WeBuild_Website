<?php

namespace App\Http\Controllers;
use App\Models\Material;
use App\Models\MaterialCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class MaterialController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }
    public function addMaterial(Request $request){
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|integer|max:100',
            'material_name' => 'required|string|max:100',
            'price_per_unit' => 'required|string|max:100',
            'available_quantity' => 'required|integer|max:100',
            'material_description' => 'required|string',
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
        if ($request->hasFile('image')) {
            // Only allow .jpg, .jpeg and .png file types.
           $validate_img = Validator::make($request->all(), [
               'image' => 'mimes:jpeg,jpg,png'
           ]);
           if($validate->fails()){
               return response()->json([
                   "error" => "Invalid file type."
               ]);
           }
           $request->image->store('materials', 'public');
        }
        $material = new Material;
        $user_id = auth()->user()->id;
        $material->warehouse_id = $user_id;
        $material->category_id = $request->category_id;
        $material->name = $request->material_name;
        $material->price_per_unit = $request->price_per_unit;
        $material->available_quantity = $request->available_quantity;
        $material->description = $request->material_description;
        if($request->image){
            $material->image_url = $request->image->hashName();
        }
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
    public function updateMaterial(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'category_id' => 'sometimes|integer|max:100',
            'material_name' => 'sometimes|string|max:100',
            'price_per_unit' => 'sometimes|string|max:100',
            'available_quantity' => 'sometimes|integer|max:100',
            'material_description' => 'sometimes|string',
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()], 422);
        }
        $material = Material::find($id);
        if($material == null){
            return response()->json([
                'error' => 'Material not found. Invalid Material Id.'
            ], 404);
        }
        $warehouse_id = auth()->user()->id;
        // Checking if editing the logged in user material
        $accessed_material = Material::where('id', $id)
                                    ->where('warehouse_id', $warehouse_id)
                                    ->first();
        if($accessed_material == null){
            return response()->json(['error' => 'Unauthorized. Cannot edit this material'], 403);
        }
        if($request->category_id){
            $category = MaterialCategory::where('id', $request->category_id)->first();
            if ($category === null) {
                return response()->json([
                    'error' => 'Category Material not found. Invalid Category id'
                ], 404);
            }
            $material->category_id = $request->category_id;
        }
        if($request->material_name){
            $material->name = $request->material_name;
        }
        if($request->price_per_unit){
            $material->price_per_unit = $request->price_per_unit;
        }
        if($request->available_quantity){
            $material->available_quantity = $request->available_quantity;
        }
        if($request->material_description){
            $material->description = $request->material_description;
        }
        if($material->save()){
            return response()->json([
                'message' => 'Material information updated successfully',
                'material' => $material,
            ], 201);
        }

    }
    public function deleteMaterial($id){
        if(!$id){
            return response()->json(['error' => 'The id is required to delete a material'], 422);
        }
        $material = Material::where("id", $id)
                                    ->first();    
        if ($material === null) {
            return response()->json([
                'error' => 'Material not found'
            ], 404);
        }
        $warehouse_id = auth()->user()->id;
        // Checking if editing the logged in user category
        $accessed_material = Material::where('id', $id)
                                    ->where('warehouse_id', $warehouse_id)
                                    ->first();
        if($accessed_material == null){
            return response()->json(['error' => 'Unauthorized. Cannot delete this material'], 403);
        }
        $material->delete();
        return response()->json([
            'message' => 'Material deleted successfully'
        ]);
    }
    public function getMaterials($warehouse_id, $category_id){
        if(!$warehouse_id){
            return response()->json(['error' => 'The warehouse id is required to fetch all materials'], 422);
        }
        if(!$category_id){
            return response()->json(['error' => 'The category id is required to fetch all materials'], 422);
        }
        $materials = Material::where("warehouse_id", $warehouse_id)
                            ->where("category_id", $category_id)
                            ->get();
        if(count($materials) == 0){
            return response()->json([
                'error' => 'No Materials found for this Warehouse and this category'
            ]);
        }
        return response()->json([
            'message' => 'Available',
            'Materials Categories' => $materials
        ]);  
    }
}
