<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MarathonCategory extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'event_time',
        'registration_fee',
        'marathon_route',
        'image',
    ];
}