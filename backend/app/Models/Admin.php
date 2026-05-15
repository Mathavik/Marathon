<?php

// app/Models/Admin.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Admin extends Model
{
    use Notifiable;
    protected $table = 'admins';

    protected $fillable = [
        'email',
        'password'
    ];

    protected $hidden = [
        'password'
    ];
}