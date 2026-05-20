<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MarathonRegistration;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [

        'event_student_id',

        'order_id',

        'payment_id',

        'signature',

        'amount',

        'payment_status',

        'payment_type',

        'transaction_id',

        'payment_date'
    ];

    // RELATIONSHIP
    public function student()
    {
        return $this->belongsTo(
            MarathonRegistration::class,
            'event_student_id',
            'id'
        );
    }
}