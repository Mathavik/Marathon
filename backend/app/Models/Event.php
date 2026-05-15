<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;
use Carbon\Carbon;

class Event extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'type',
        'age_group',
        'image',
        'entry_fee',
        'event_date',
        'start_time',
        'end_time',
        'is_visible',
    ];

    // protected $appends = ['image_url'];
    protected $appends = ['image_url', 'status']; // ✅ updated
    // protected $appends = ['image_url', 'status'];

    // 🖼️ Image URL
    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        return URL::to('/') . '/upload/events/' . $this->image;
    }

    // 🔥 STATUS LOGIC (FULL FIXED)
    public function getStatusAttribute()
    {
        // ❌ if missing values
        if (!$this->event_date || !$this->start_time || !$this->end_time) {
            return "upcoming";
        }

        try {
            $start = Carbon::parse($this->event_date . ' ' . $this->start_time);
            $end   = Carbon::parse($this->event_date . ' ' . $this->end_time);
            $now   = Carbon::now();

            if ($now->lt($start)) {
                return 'upcoming';
            } elseif ($now->between($start, $end)) {
                return 'ongoing';
            } else {
                return 'completed';
            }
        } catch (\Exception $e) {
            return "upcoming"; // fallback
        }
    }

    // 📂 Category relation
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

public function students()
{
    return $this->belongsToMany(Student::class)
                ->withPivot('event_name', 'payment_ref_id', 'event_time', 'prize')
                ->withTimestamps();
}

}



