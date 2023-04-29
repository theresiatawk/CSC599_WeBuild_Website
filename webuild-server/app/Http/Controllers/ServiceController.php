<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Availability;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Validator;

class ServiceController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }
    public function addServiceWithGenerator(Request $request){
        $data = $request->all();
        $validator = Validator::make($request->all(), [
            'service_name' => 'required|string|max:100',
            'price_per_hour' => 'required|string|max:100',
            'service_description' => 'required|string',
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
           $request->image->store('services', 'public');
        }
        $service = new Service;
        $user_id = auth()->user()->id;
        $service->warehouse_id = $user_id;
        $service->name = $request->service_name;
        $service->price_per_hour = $request->price_per_hour;
        $service->description = $request->service_description;
        if($request->image){
            $service->image_url = $request->image->hashName();
        }
        $service->save();
        $type = gettype($service->id);
        if($request->isOpenMonday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Monday', $data, $service->id);
        }
        if($request->isOpenTuesday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Tuesday', $data, $service->id);
        }
        if($request->isOpenWednesday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Wednesday', $data, $service->id);
        }
        if($request->isOpenThursday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Thursday', $data, $service->id);
        }
        if($request->isOpenFriday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Friday', $data, $service->id);
        }
        if($request->isOpenSaturday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Saturday', $data, $service->id);
        }
        if($request->isOpenSunday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Sunday', $data, $service->id);
        }
        return response()->json([
            'message' => 'Service successfully added',
        ], 201);   
    }

    public function updateService(Request $request, $id){
        if(!$id){
            return response()->json(['error' => 'The id is required to update a service']);
        }
        $data = $request->all();
        $validator = Validator::make($request->all(), [
            'service_name' => 'required|string|max:100',
            'price_per_hour' => 'required|string|max:100',
            'service_description' => 'required|string',
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
        $service = Service::find($id);
        if($service == null){
            return response()->json([
                'error' => 'Service not found. Invalid Service Id.'
            ]);
        }
        $warehouse_id = auth()->user()->id;
        // Checking if editing the logged in user service
        $accessed_service = Service::where('id', $id)
                                    ->where('warehouse_id', $warehouse_id)
                                    ->first();
        if($accessed_service == null){
            return response()->json(['error' => 'Unauthorized. Cannot edit this service']);
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
           $request->image->store('services', 'public');
           if($service->image_url !== 'images/WeBuild_Logo.png'){
                $path = 'public/services/' . $service->image_url;
                if (Storage::exists($path)) {
                    Storage::delete($path); 
                }
            }
        }
        $service->name = $request->service_name;
        $service->price_per_hour = $request->price_per_hour;
        $service->description = $request->service_description;
        if($request->image){
            $service->image_url = $request->image->hashName();
        }
        $service->save();
        //Deleting previous availabilities and generating new ones
        $found_services = Availability::where('type', 'service')
                                    ->where('item_id', $service->id)
                                    ->get();
        if($found_services->count() > 0){
            Availability::where('type', 'service')
                        ->where('item_id', $service->id)
                        ->delete();
        }
        if($request->isOpenMonday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Monday', $data, $service->id);
        }
        if($request->isOpenTuesday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Tuesday', $data, $service->id);
        }
        if($request->isOpenWednesday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Wednesday', $data, $service->id);
        }
        if($request->isOpenThursday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Thursday', $data, $service->id);
        }
        if($request->isOpenFriday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Friday', $data, $service->id);
        }
        if($request->isOpenSaturday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Saturday', $data, $service->id);
        }
        if($request->isOpenSunday == "1"){
            $this->generateAvailabilitiesForDayOfWeek('Sunday', $data, $service->id);
        }
        if($service->save()){
            return response()->json([
                'message' => 'Service information updated successfully',
                'service' => $service,
            ], 201);
        }
    }
    public function deleteService($id){
        if(!$id){
            return response()->json(['error' => 'The id is required to delete a service']);
        }
        $service = Service::where("id", $id)
                                    ->first();    
        if ($service === null) {
            return response()->json([
                'error' => 'Service not found'
            ]);
        }
        $warehouse_id = auth()->user()->id;
        // Checking if editing the logged in user category
        $accessed_service = Service::where('id', $id)
                                    ->where('warehouse_id', $warehouse_id)
                                    ->first();
        if($accessed_service == null){
            return response()->json(['error' => 'Unauthorized. Cannot delete this service']);
        }
        $found_services = Availability::where('type', 'service')
                                    ->where('item_id', $service->id)
                                    ->get();
        if($found_services->count() > 0){
            Availability::where('type', 'service')
                        ->where('item_id', $service->id)
                        ->delete();
        }
        if($service->image_url !== 'images/WeBuild_Logo.png'){
            $path = 'public/services/' . $service->image_url;
            if (Storage::exists($path)) {
                if (Storage::delete($path)) {
                    if ($service->delete()) {
                        return response()->json([
                            'message' => 'Service deleted successfully with its corresponding image'
                        ]);
                    };
                }
            }  
        }
        if($service->delete()){
            return response()->json([
                'message' => 'Service deleted successfully'
            ]);
        }
        else{
            return response()->json([
                'error' => 'Failed to delete the image successfuly'
            ]);
        }
    }
    public function getServices($warehouse_id){
        if(!$warehouse_id){
            return response()->json(['error' => 'The warehouse id is required to fetch all services.']);
        }
        $services = Service::where("warehouse_id", $warehouse_id)
                            ->get();
        if(count($services) == 0){
            return response()->json([
                'error' => 'No Services found for this Warehouse.'
            ]);
        }
        return response()->json([
            'message' => 'Available',
            'Services' => $services
        ]);
    }
    public function getService($id){
        if(!$id){
            return response()->json(['error' => 'The id is required to fetch a service.']);
        }
        $service = Service::where("id", $id)
                            ->first();
        if($service == null){
            return response()->json(['error' => 'This service is not found.']);
        }
        $service_availability = Availability::where('type', 'service')
                                            ->where('item_id', $id)
                                            ->get();
        $services = DB::table('service')
                    ->join('availabilities', 'services.id', '=', 'availabilities.item_id')
                    ->select('services.*','availabilities.*')
                    ->where('services.id','=',$id)
                    ->get();
        return response()->json([
            'message' => 'Available',
            'Sevices' => $services
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
            $availability->type = "service";
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
