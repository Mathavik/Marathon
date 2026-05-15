<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Gallery extends Model
{
    protected $fillable = ['image', 'category'];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return URL::to('/') . '/upload/gallery/' . $this->image;
    }
}