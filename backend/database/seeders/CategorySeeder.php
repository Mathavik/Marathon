<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;   // 👈 idhu add pannanu

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name' => 'Sports',
                'description' => 'Indoor and Outdoor Sports Events'
            ],
            [
                'name' => 'Performing Arts',
                'description' => 'Dance, Singing, Drama, Music'
            ],
            [
                'name' => 'Visual Arts',
                'description' => 'Painting, Rangoli, Craft, Photography'
            ],
            [
                'name' => 'Fun / Misc',
                'description' => 'Quiz, Debate, Talent Shows'
            ]
        ]);
    }
}