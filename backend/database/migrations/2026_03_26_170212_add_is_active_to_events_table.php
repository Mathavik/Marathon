<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            // Add is_active column, default 0 (not selected by admin)
            $table->boolean('is_active')->default(0)->after('end_time'); 
            // You can change 'after' column based on your table structure
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            // Remove the is_active column if migration is rolled back
            $table->dropColumn('is_active');
        });
    }
};