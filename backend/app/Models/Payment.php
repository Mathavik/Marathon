<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

  protected $fillable = [
    'payment_id',
    'payment_type',
    'amount',
    'payment_status',
    'payment_date',
    'transaction_id',
    'event_student_id'
];

    public function eventRegistration()
    {
        return $this->belongsTo(EventRegistration::class, 'event_student_id');
    }
}