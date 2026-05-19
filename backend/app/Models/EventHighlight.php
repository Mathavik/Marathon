<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventHighlight extends Model
{
    protected $table = 'event_highlights';

    protected $fillable = [
        'title',
        'image'
    ];
}