<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Validator;
use App\Models\WarehouseReview;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReviewsController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }
    function addReview(Request $request){
        $validator = Validator::make($request->all(), [
            'warehouse_id' => 'required|integer',
            'comment' => 'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()]);
        }
        $user = Auth::user();
        $user_id = $user->id;
        $warehouse = User::find($request->warehouse_id);
        if(!$warehouse){
            return response()->json([
                "error" => "Invalid Warehouse ID",
            ]);
        }
        $is_warehouse = $warehouse->user_type;
        if($is_warehouse !== "w"){
            return response()->json([
                "error" => "Invalid Warehouse ID",
            ]);
        }
        // Adding new Review
        $review = new WarehouseReview;
        $review->user_id = $user_id;
        $review->warehouse_id = $request->warehouse_id;
        $review->comment = $request->comment;
        if($review->save()){
            return response()->json([
                'message' => 'Comment Added',
                'comment' => $review
            ], 200);
        }
    }
    function deleteReview($review_id){
        $user = Auth::user();
        $user_id = $user->id;
        $review = WarehouseReview::find($review_id);
        if(!$review){
            return response()->json([
                "error" => "This review does not exist.",
            ]);
        }
        if($user_id != $review->user_id){
            return response()->json([
                "error" => "You are not allowed to delete this comment",
            ]);
        }
        if($review->delete()){
            return response()->json([
                'message' => 'Review Deleted',
            ], 200);
        }
    }
    function getReviews($warehouse_id){
        $warehouse = User::find($warehouse_id);
        if(!$warehouse){
            return response()->json([
                "error" => "This warehouse does not exist",
            ]);
        }
        //Getting username with content of each review
        $reviews = DB::table('users')
            ->join('warehouse_reviews', 'users.id', '=', 'warehouse_reviews.user_id')
            ->where('warehouse_reviews.warehouse_id', '=', $warehouse_id)
            ->select('warehouse_reviews.id','users.username', 'warehouse_reviews.comment', 'warehouse_reviews.user_id')
            ->get();

        if(count($reviews) == 0){
            return response()->json([
                'message' => 'No Comments',
                'total' => 0
            ]);
        }
        return response()->json([
            'message' => 'Available',
            'comments' => $reviews,
            'total' => count($reviews)
        ], 200);   
    }
}
