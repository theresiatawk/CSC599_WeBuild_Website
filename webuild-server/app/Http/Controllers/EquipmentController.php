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
            return response()->json(['error' => $validator->errors()], 422);
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
        $equipment->save();
        $type = gettype($equipment->id);
        if($request->isOpenMonday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Monday', $data, $equipment->id);
        }
        return response()->json([
            'message' => 'Equipment successfully added',
        ], 201);   
    }
    private function generateAvailabilitiesForDayOfWeek(string $dayOfWeek, array $data, int $eq_id){
        $year = $data['year'];
        $month = $data['month'];
        $startTime = $data[$dayOfWeek . 'StartTime'];
        $endTime = $data[$dayOfWeek . 'EndTime'];

        // $startDateTime = new Carbon("{$year}-{$month}-01 {$startTime}");
        // $startDateTime = Carbon::createFromDate($year, $month, 1)->next($dayOfWeek);
        $startDateTime = Carbon::createFromFormat('Y-m-d H:i', "$year-$month-01 $startTime");
        while ($startDateTime->englishDayOfWeek !== ucfirst($dayOfWeek)) {
            $startDateTime->addDay();
        }   
        $endDateTime = Carbon::createFromFormat('Y-m-d H:i', "$year-$month-01 $endTime");
        while ($endDateTime->englishDayOfWeek !== ucfirst($dayOfWeek)) {
            $endDateTime->addDay();
        } 
        $lastDayOfMonth = Carbon::create($year, $month)->lastOfMonth()->setTimeFromTimeString($endTime);
        // dd($lastDayOfMonth);

        // loop through each Monday in the month and create an availability
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
