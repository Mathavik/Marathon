<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up()
{
    Schema::table('teams', function (Blueprint $table) {

        $table->string('event_name')->after('event_id');

        $table->json('members')->after('team_name');

    });
}

public function down()
{
    Schema::table('teams', function (Blueprint $table) {

        $table->dropColumn('event_name');
        $table->dropColumn('members');

    });
}
};
