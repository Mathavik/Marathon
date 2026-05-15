<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Category extends Model
{
    protected $fillable = ['name', 'description', 'image'];

    // 🖼️ Image-ku Full URL kidaikka intha Accessor
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }
        // Unga folder structure: public/upload/catogories/
        return URL::to('/') . '/upload/catogories/' . $this->image;
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }
}