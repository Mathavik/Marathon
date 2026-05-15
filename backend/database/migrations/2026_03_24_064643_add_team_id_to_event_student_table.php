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
    Schema::table('event_student', function (Blueprint $table) {
        $table->unsignedBigInteger('team_id')->nullable()->after('event_id');

        $table->foreign('team_id')
              ->references('id')
              ->on('teams')
              ->onDelete('cascade');
    });
}

public function down()
{
    Schema::table('event_student', function (Blueprint $table) {
        $table->dropForeign(['team_id']);
        $table->dropColumn('team_id');
    });
}
};
