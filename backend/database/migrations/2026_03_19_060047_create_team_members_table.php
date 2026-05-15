<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up()
{
    Schema::create('team_members', function (Blueprint $table) {
        $table->id();

        $table->foreignId('team_id')
              ->constrained()
              ->cascadeOnDelete();

        $table->foreignId('student_id')
              ->constrained()
              ->cascadeOnDelete();

        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('team_members');
}
};
