<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventRegistration extends Model
{
    use HasFactory;

    protected $table = 'event_student';

    protected $fillable = [
        'student_id',
        'event_id',
        'event_name',
        'payment_ref_id',
        'event_time'
    ];

    public function payment()
    {
        return $this->belongsTo(Payment::class, 'payment_ref_id');
    }

    public function linkedPayments()
    {
        return $this->hasMany(Payment::class, 'event_student_id');
    }
}