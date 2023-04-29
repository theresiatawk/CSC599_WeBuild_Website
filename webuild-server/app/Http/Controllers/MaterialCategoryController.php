<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MaterialCategory;
use Illuminate\Support\Facades\DB;
use Validator;

class MaterialCategoryController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }
    public function addMaterialCategory(Request $request){
        $validator = Validator::make($request->all(), [
            'category_name' => 'required|string|max:100',
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()], 422);
        }
        $category = new MaterialCategory;
        $user_id = auth()->user()->id;
        $category->warehouse_id = $user_id;
        $category->name = $request->category_name;
        if($category->save()){
            return response()->json([
                'message' => 'Category successfully added',
            ], 201);
        }
        else{
            return response()->json([
                'error' => 'Failed to add the category',
            ], 422);
        }
    }
    public function updateMaterialCategory($id, $newName){
        if (!$id) {
            return response()->json(['error' => 'The id is required to update a category'], 422);
        }

        if (!$newName) {
            return response()->json(['error' => 'The new name is required to update a category'], 422);
        }

        $category = MaterialCategory::where('id', $id)->first();
        if ($category === null) {
            return response()->json([
                'error' => 'Category material not found'
            ], 404);
        }
        $warehouse_id = auth()->user()->id;
        // Checking if editing the logged in user category
        $accessed_category = MaterialCategory::where('id', $id)
                                    ->where('warehouse_id', $warehouse_id)
                                    ->first();
        if($accessed_category == null){
            return response()->json(['error' => 'Unauthorized. Cannot edit this category'], 403);
        }
        // Update the name of the category in the `material_categories` table
        $category->name = $newName;
        $category->save();

        return response()->json([
            'message' => 'Category material updated successfully'
        ]);
    }

    public function deleteMaterialCategory($id){
        if(!$id){
            return response()->json(['error' => 'The id is required to delete a category'], 422);
        }
        $category = MaterialCategory::where("id", $id)
                                    ->first();    
        if ($category === null) {
            return response()->json([
                'error' => 'Category material not found'
            ], 404);
        }
        $warehouse_id = auth()->user()->id;
        // Checking if editing the logged in user category
        $accessed_category = MaterialCategory::where('id', $id)
                                    ->where('warehouse_id', $warehouse_id)
                                    ->first();
        if($accessed_category == null){
            return response()->json(['error' => 'Unauthorized. Cannot delete this category'], 403);
        }
        DB::table('materials')->where('category_id', $category->id)->delete();
        $category->delete();
        return response()->json([
            'message' => 'Category material and corresponding materials deleted successfully'
        ]);
    }
    public function getMaterialsCategories($warehouse_id){
        if(!$warehouse_id){
            return response()->json(['error' => 'The warehouse id is required to fetch all categories'], 422);
        }
        $categories = MaterialCategory::where("warehouse_id", $warehouse_id)
                                    ->get();
        if(count($categories) == 0){
            return response()->json([
                'error' => 'No Category Material found for this Warehouse'
            ]);
        }
        return response()->json([
            'message' => 'Available',
            'Categories' => $categories
        ]);  
    }
}

