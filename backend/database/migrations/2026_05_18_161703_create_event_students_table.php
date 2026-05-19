<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_students', function (Blueprint $table) {

            $table->id();

            // FOREIGN KEY
            $table->unsignedBigInteger('student_id');

            $table->unsignedBigInteger('event_id');

            $table->string('event_name');

            $table->timestamp('event_time');

            $table->integer('amount');

            $table->timestamps();

            // FOREIGN KEY RELATION
            $table->foreign('student_id')
                  ->references('id')
                  ->on('marathon_registrations')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_students');
    }
};