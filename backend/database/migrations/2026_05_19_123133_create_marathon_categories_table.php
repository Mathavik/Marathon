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
       Schema::create('marathon_categories', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('subtitle');
    $table->string('event_time');
    $table->string('registration_fee');
    $table->string('marathon_route');
    $table->string('image');
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marathon_categories');
    }
};