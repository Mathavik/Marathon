<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CertificateSetting extends Model
{
    protected $fillable = [
        'background_image',
        'principal_signature',
        'coordinator_signature',
        'logo'
    ];
}