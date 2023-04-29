<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory;
    
    public function availabilities()
    {
        return $this->morphMany(Availability::class, 'item', 'type');
    }
}
