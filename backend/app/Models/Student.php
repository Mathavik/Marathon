<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name','email','password','phone','gender',
        'dob','age','school_name','school_code','class','city'
    ];

    protected $hidden = ['password'];

public function events()
{
    return $this->belongsToMany(Event::class)
                ->withPivot('event_name', 'payment_ref_id', 'event_time', 'prize')
                ->withTimestamps();
}

}

