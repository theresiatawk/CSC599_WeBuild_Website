<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Equipment;
use App\Models\Availability;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Validator;

class EquipmentController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }
    public function addEquipmentWithGenerator(Request $request){
        $data = $request->all();
        $validator = Validator::make($request->all(), [
            'equipment_name' => 'required|string|max:100',
            'price_per_hour' => 'required|string|max:100',
            'equipment_description' => 'required|string',
            'year' => 'required|integer|between:1970,2030',
            'month' => 'required|integer|between:1,12',
            'isOpenMonday' => 'required|integer|in: 0,1',
            'isOpenTuesday' => 'required|integer|in: 0,1',
            'isOpenWednesday' => 'required|integer|in: 0,1',
            'isOpenThursday' => 'required|integer|in: 0,1',
            'isOpenFriday' => 'required|integer|in: 0,1',
            'isOpenSaturday' => 'required|integer|in: 0,1',
            'isOpenSunday' => 'required|integer|in: 0,1',
            'MondayStartTime' => 'required_if:isOpenMonday,1|date_format:H:i',
            'MondayEndTime' => 'required_if:isOpenMonday,1|date_format:H:i|after:MondayStartTime',
            'TuesdayStartTime' => 'required_if:isOpenTuesday,1|date_format:H:i',
            'TuesdayEndTime' => 'required_if:isOpenTuesday,1|date_format:H:i|after:TuesdayStartTime',
            'WednesdayStartTime' => 'required_if:isOpenWednesday,1|date_format:H:i',
            'WednesdayEndTime' => 'required_if:isOpenWednesday,1|date_format:H:i|after:WednesdayStartTime',
            'ThursdayStartTime' => 'required_if:isOpenThursday,1|date_format:H:i',
            'ThursdayEndTime' => 'required_if:isOpenThursday,1|date_format:H:i|after:ThursdayStartTime',
            'FridayStartTime' => 'required_if:isOpenFriday,1|date_format:H:i',
            'FridayEndTime' => 'required_if:isOpenFriday,1|date_format:H:i|after:FridayStartTime',
            'SaturdayStartTime' => 'required_if:isOpenSaturday,1|date_format:H:i',
            'SaturdayEndTime' => 'required_if:isOpenSaturday,1|date_format:H:i|after:SaturdayStartTime',
            'SundayStartTime' => 'required_if:isOpenSunday,1|date_format:H:i',
            'SundayEndTime' => 'required_if:isOpenSunday,1|date_format:H:i|after:SundayStartTime',
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
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
           $request->image->store('equipments', 'public');
        }
        $equipment = new Equipment;
        $user_id = auth()->user()->id;
        $equipment->warehouse_id = $user_id;
        $equipment->name = $request->equipment_name;
        $equipment->price_per_hour = $request->price_per_hour;
        $equipment->description = $request->equipment_description;
        if($request->image){
            $equipment->image_url = $request->image->hashName();
        }
        $equipment->save();
        $type = gettype($equipment->id);
        if($request->isOpenMonday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Monday', $data, $equipment->id);
        }
        if($request->isOpenTuesday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Tuesday', $data, $equipment->id);
        }
        if($request->isOpenWednesday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Wednesday', $data, $equipment->id);
        }
        if($request->isOpenThursday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Thursday', $data, $equipment->id);
        }
        if($request->isOpenFriday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Friday', $data, $equipment->id);
        }
        if($request->isOpenSaturday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Saturday', $data, $equipment->id);
        }
        if($request->isOpenSunday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Sunday', $data, $equipment->id);
        }
        return response()->json([
            'message' => 'Equipment successfully added',
        ], 201);   
    }
    public function updateEquipment(Request $request, $id){
        if(!$id){
            return response()->json(['error' => 'The id is required to update an equipment']);
        }
        $data = $request->all();
        $validator = Validator::make($request->all(), [
            'equipment_name' => 'required|string|max:100',
            'price_per_hour' => 'required|string|max:100',
            'equipment_description' => 'required|string',
            'year' => 'required|integer|between:1970,2030',
            'month' => 'required|integer|between:1,12',
            'isOpenMonday' => 'required|integer|in: 0,1',
            'isOpenTuesday' => 'required|integer|in: 0,1',
            'isOpenWednesday' => 'required|integer|in: 0,1',
            'isOpenThursday' => 'required|integer|in: 0,1',
            'isOpenFriday' => 'required|integer|in: 0,1',
            'isOpenSaturday' => 'required|integer|in: 0,1',
            'isOpenSunday' => 'required|integer|in: 0,1',
            'MondayStartTime' => 'required_if:isOpenMonday,1|date_format:H:i',
            'MondayEndTime' => 'required_if:isOpenMonday,1|date_format:H:i|after:MondayStartTime',
            'TuesdayStartTime' => 'required_if:isOpenTuesday,1|date_format:H:i',
            'TuesdayEndTime' => 'required_if:isOpenTuesday,1|date_format:H:i|after:TuesdayStartTime',
            'WednesdayStartTime' => 'required_if:isOpenWednesday,1|date_format:H:i',
            'WednesdayEndTime' => 'required_if:isOpenWednesday,1|date_format:H:i|after:WednesdayStartTime',
            'ThursdayStartTime' => 'required_if:isOpenThursday,1|date_format:H:i',
            'ThursdayEndTime' => 'required_if:isOpenThursday,1|date_format:H:i|after:ThursdayStartTime',
            'FridayStartTime' => 'required_if:isOpenFriday,1|date_format:H:i',
            'FridayEndTime' => 'required_if:isOpenFriday,1|date_format:H:i|after:FridayStartTime',
            'SaturdayStartTime' => 'required_if:isOpenSaturday,1|date_format:H:i',
            'SaturdayEndTime' => 'required_if:isOpenSaturday,1|date_format:H:i|after:SaturdayStartTime',
            'SundayStartTime' => 'required_if:isOpenSunday,1|date_format:H:i',
            'SundayEndTime' => 'required_if:isOpenSunday,1|date_format:H:i|after:SundayStartTime',
        ]);
        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }
        $equipment = Equipment::find($id);
        if($equipment == null){
            return response()->json([
                'error' => 'Equipment not found. Invalid Equipment Id.'
            ]);
        }
        $warehouse_id = auth()->user()->id;
        // Checking if editing the logged in user equipment
        $accessed_equipment = Equipment::where('id', $id)
                                    ->where('warehouse_id', $warehouse_id)
                                    ->first();
        if($accessed_equipment == null){
            return response()->json(['error' => 'Unauthorized. Cannot edit this equipment']);
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
           $request->image->store('equipments', 'public');
           if($equipment->image_url !== 'images/WeBuild_Logo.png'){
                $path = 'public/equipments/' . $equipment->image_url;
                if (Storage::exists($path)) {
                    Storage::delete($path); 
                }
            }
        }
        $equipment->name = $request->equipment_name;
        $equipment->price_per_hour = $request->price_per_hour;
        $equipment->description = $request->equipment_description;
        if($request->image){
            $equipment->image_url = $request->image->hashName();
        }
        $equipment->save();
        //Deleting previous availabilities and generating new ones
        $found_equipments = Availability::where('type', 'equipment')
                                    ->where('item_id', $equipment->id)
                                    ->get();
        if($found_equipments->count() > 0){
            Availability::where('type', 'equipment')
                        ->where('item_id', $equipment->id)
                        ->delete();
        }
        if($request->isOpenMonday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Monday', $data, $equipment->id);
        }
        if($request->isOpenTuesday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Tuesday', $data, $equipment->id);
        }
        if($request->isOpenWednesday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Wednesday', $data, $equipment->id);
        }
        if($request->isOpenThursday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Thursday', $data, $equipment->id);
        }
        if($request->isOpenFriday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Friday', $data, $equipment->id);
        }
        if($request->isOpenSaturday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Saturday', $data, $equipment->id);
        }
        if($request->isOpenSunday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Sunday', $data, $equipment->id);
        }
        if($equipment->save()){
            return response()->json([
                'message' => 'Equipment information updated successfully',
                'equipment' => $equipment,
            ], 201);
        }
    }
    public function deleteEquipment($id){
        if(!$id){
            return response()->json(['error' => 'The id is required to delete an equipment']);
        }
        $equipment = Equipment::where("id", $id)
                                    ->first();    
        if ($equipment === null) {
            return response()->json([
                'error' => 'Equipment not found'
            ]);
        }
        $warehouse_id = auth()->user()->id;
        // Checking if editing the logged in user category
        $accessed_equipment = Equipment::where('id', $id)
                                    ->where('warehouse_id', $warehouse_id)
                                    ->first();
        if($accessed_equipment == null){
            return response()->json(['error' => 'Unauthorized. Cannot delete this equipmment']);
        }
        $found_equipments = Availability::where('type', 'equipment')
                                    ->where('item_id', $equipment->id)
                                    ->get();
        if($found_equipments->count() > 0){
            Availability::where('type', 'equipment')
                        ->where('item_id', $equipment->id)
                        ->delete();
        }
        if($equipment->image_url !== 'images/WeBuild_Logo.png'){
            $path = 'public/equipments/' . $equipment->image_url;
            if (Storage::exists($path)) {
                if (Storage::delete($path)) {
                    if ($equipment->delete()) {
                        return response()->json([
                            'message' => 'Equipment deleted successfully with its corresponding image'
                        ]);
                    };
                }
            }  
        }
        if($equipment->delete()){
            return response()->json([
                'message' => 'Equipment deleted successfully'
            ]);
        }
        else{
            return response()->json([
                'error' => 'Failed to delete the image successfuly'
            ]);
        }
    }
    public function getEquipments($warehouse_id){
        if(!$warehouse_id){
            return response()->json(['error' => 'The warehouse id is required to fetch all equipments.']);
        }
        $equipments = Equipment::where("warehouse_id", $warehouse_id)
                            ->get();
        if(count($equipments) == 0){
            return response()->json([
                'error' => 'No Equipments found for this Warehouse.'
            ]);
        }
        return response()->json([
            'message' => 'Available',
            'Equipments' => $equipments
        ]);
    }
    public function getEquipment($id){
        if(!$id){
            return response()->json(['error' => 'The id is required to fetch an equipment.']);
        }
        $equipment = Equipment::where("id", $id)
                            ->first();
        if($equipment == null){
            return response()->json(['error' => 'This equipment is not found.']);
        }
        // $equipment_availability = Availability::where('type', 'equipment')
        //                                     ->where('item_id', $id)
        //                                     ->get();
        $equipment = DB::table('equipment')
                    ->join('availabilities', 'equipment.id', '=', 'availabilities.item_id')
                    ->where('availabilities.type', '=', 'equipment')
                    ->where('equipment.id','=',$id)
                    ->select('equipment.*','availabilities.*')
                    ->get();
        return response()->json([
            'message' => 'Available',
            'Equipments' => $equipment,
        ]);

    }
    private function generateAvailabilitiesForDayOfWeek(string $dayOfWeek, array $data, int $eq_id){
        $year = $data['year'];
        $month = $data['month'];
        $startTime = $data[$dayOfWeek . 'StartTime'];
        $endTime = $data[$dayOfWeek . 'EndTime'];

        $startDateTime = Carbon::createFromFormat('Y-m-d H:i', "$year-$month-01 $startTime");
        while ($startDateTime->englishDayOfWeek !== ucfirst($dayOfWeek)) {
            $startDateTime->addDay();
        }   
        $endDateTime = Carbon::createFromFormat('Y-m-d H:i', "$year-$month-01 $endTime");
        while ($endDateTime->englishDayOfWeek !== ucfirst($dayOfWeek)) {
            $endDateTime->addDay();
        } 
        $lastDayOfMonth = Carbon::create($year, $month)->lastOfMonth()->setTimeFromTimeString($endTime);
        // loop through each specific day of the week in the month and create an availability
        while ($startDateTime->lte($lastDayOfMonth)) {
            $availability = new Availability;
            $availability->type = "equipment";
            $availability->item_id = $eq_id;
            $availability->date = $startDateTime->toDateString();
            $availability->start_time = $startDateTime;
            $availability->end_time = $endDateTime;
            $availability->save();
            $startDateTime->addWeek();
            $endDateTime->addWeek();
        }
    }
}