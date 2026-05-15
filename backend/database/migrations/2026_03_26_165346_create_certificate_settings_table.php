<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('certificate_settings', function (Blueprint $table) {
            $table->id();
            $table->string('background_image')->nullable();
            $table->string('principal_signature')->nullable();
            $table->string('coordinator_signature')->nullable();
            $table->string('logo')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('certificate_settings');
    }
};