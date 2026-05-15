<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up()
{
    Schema::table('events', function (Blueprint $table) {
        $table->decimal('entry_fee', 8, 2)->default(0);
    });
}

public function down()
{
    Schema::table('events', function (Blueprint $table) {
        $table->dropColumn('entry_fee');
    });
}
};
