<?php

namespace App\Http\Controllers;
use App\Models\Material;
use App\Models\MaterialCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Validator;

class MaterialController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }
    public function addMaterial(Request $request){
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|integer',
            'material_name' => 'required|string|max:100',
            'price_per_unit' => 'required|integer',
            'available_quantity' => 'required|integer',
            'material_description' => 'required|string',
            'image' => 'nullable|file|max:2048|mimes:jpeg,jpg,png',
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }
        $category = MaterialCategory::where("id", $request->category_id)
                                    ->first(); 
        if ($category === null) {
            return response()->json([
                'error' => 'Category Material not found. Invalid Category id'
            ]);
        }
        if ($request->hasFile('image')) {
            // Only allow .jpg, .jpeg and .png file types.
        //    $validate_img = Validator::make($request->all(), [
        //        'image' => 'mimes:jpeg,jpg,png|max:2048|mimes:jpeg,jpg,png|'
        //    ]);
        //    if($validate_img->fails()){
        //        return response()->json([
        //            "error" => "Invalid file type."
        //        ]);
        //    }
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
            ]);
        }
    }
    public function updateMaterial(Request $request, $id){
        if(!$id){
            return response()->json(['error' => 'The id is required to update a material']);
        }
        $validator = Validator::make($request->all(), [
            'category_id' => 'sometimes|integer',
            'material_name' => 'sometimes|string|max:100',
            'price_per_unit' => 'sometimes|integer',
            'available_quantity' => 'sometimes|integer',
            'material_description' => 'sometimes|string',
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }
        $material = Material::find($id);
        if($material == null){
            return response()->json([
                'error' => 'Material not found. Invalid Material Id.'
            ]);
        }
        $warehouse_id = auth()->user()->id;
        // Checking if editing the logged in user material
        $accessed_material = Material::where('id', $id)
                                    ->where('warehouse_id', $warehouse_id)
                                    ->first();
        if($accessed_material == null){
            return response()->json(['error' => 'Unauthorized. Cannot edit this material']);
        }
        if($request->category_id){
            $category = MaterialCategory::where('id', $request->category_id)->first();
            if ($category === null) {
                return response()->json([
                    'error' => 'Category Material not found. Invalid Category id'
                ]);
            }
            $material->category_id = $request->category_id;
        }
        if ($request->hasFile('image')) {
            // Only allow .jpg, .jpeg and .png file types.
           $validate_img = Validator::make($request->all(), [
               'image' => 'mimes:jpeg,jpg,png'
           ]);
           if($validate_img->fails()){
               return response()->json([
                   "error" => "Invalid file type."
               ]);
           }
           $request->image->store('materials', 'public');
           if($material->image_url !== 'images/WeBuild_Logo.png'){
                $path = 'public/materials/' . $material->image_url;
                if (Storage::exists($path)) {
                    Storage::delete($path); 
                }
            }  
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
        if($request->image){
            $material->image_url = $request->image->hashName();
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
            return response()->json(['error' => 'The id is required to delete a material']);
        }
        $material = Material::where("id", $id)
                                    ->first();    
        if ($material === null) {
            return response()->json([
                'error' => 'Material not found'
            ]);
        }
        $warehouse_id = auth()->user()->id;
        // Checking if editing the logged in user category
        $accessed_material = Material::where('id', $id)
                                    ->where('warehouse_id', $warehouse_id)
                                    ->first();
        if($accessed_material == null){
            return response()->json(['error' => 'Unauthorized. Cannot delete this material']);
        }
        if($material->image_url !== 'images/WeBuild_Logo.png'){
            $path = 'public/materials/' . $material->image_url;
            if (Storage::exists($path)) {
                if (Storage::delete($path)) {
                    if ($material->delete()) {
                        return response()->json([
                            'message' => 'Material deleted successfully with its corresponding image'
                        ]);
                    };
                }
            }  
        }
        if($material->delete()){
            return response()->json([
                'message' => 'Material deleted successfully'
            ]);
        }
        else{
            return response()->json([
                'error' => 'Failed to delete the image successfuly'
            ]);
        }
    }
    public function getMaterials($warehouse_id, $category_id){
        if(!$warehouse_id){
            return response()->json(['error' => 'The warehouse id is required to fetch all materials']);
        }
        if(!$category_id){
            return response()->json(['error' => 'The category id is required to fetch all materials']);
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
            'Materials' => $materials
        ]);  
    }
    public function getMaterial($id){
        if (!$id) {
            return response()->json(['error' => 'The id is required to fetch a material']);
        }
        $material = Material::where('id', $id)->first();
        if ($material === null) {
            return response()->json([
                'error' => 'Material not found'
            ]);
        }
        return response()->json([
            'message' => $material
        ]);
    }
}