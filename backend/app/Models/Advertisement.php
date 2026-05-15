<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'event_date',
        'start_date',
        'end_date',
        'is_active'
    ];
}
