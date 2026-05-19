<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MarathonRegistration extends Model
{
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'gender',
        'dob',
        'age',
        'city',
        'address',
        'emergency_name',
        'emergency_phone',
        'tshirt_size',
        'category',
        'medical_condition',
        'api_token'
    ];

    protected $hidden = [
        'password',
        'api_token'
    ];
}