<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('payments', function (Blueprint $table) {

            $table->dropForeign(['event_student_id']);

        });

        Schema::table('payments', function (Blueprint $table) {

            $table->foreign('event_student_id')
                  ->references('id')
                  ->on('event_students')
                  ->onDelete('cascade');

        });
    }

    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {

            $table->dropForeign(['event_student_id']);

        });
    }
};