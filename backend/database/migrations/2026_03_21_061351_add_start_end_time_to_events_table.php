<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('events', function (Blueprint $table) {

            if (!Schema::hasColumn('events', 'start_time')) {
                $table->time('start_time')->nullable();
            }

            if (!Schema::hasColumn('events', 'end_time')) {
                $table->time('end_time')->nullable();
            }

        });
    }

    public function down()
    {
        Schema::table('events', function (Blueprint $table) {

            if (Schema::hasColumn('events', 'start_time')) {
                $table->dropColumn('start_time');
            }

            if (Schema::hasColumn('events', 'end_time')) {
                $table->dropColumn('end_time');
            }

        });
    }
};