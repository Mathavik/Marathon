<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::create('teams', function (Blueprint $table) {
        $table->id();

        $table->foreignId('event_id')->constrained()->cascadeOnDelete();

        $table->foreignId('captain_id')
              ->constrained('students')
              ->cascadeOnDelete();

        $table->string('team_name');

        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('teams');
}
};
