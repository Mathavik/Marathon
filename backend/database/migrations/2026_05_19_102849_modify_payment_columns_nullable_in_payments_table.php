<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('payments', function (Blueprint $table) {

            $table->string('payment_id')->nullable()->change();

            $table->string('transaction_id')->nullable()->change();

            $table->timestamp('payment_date')->nullable()->change();

        });
    }

    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {

            $table->string('payment_id')->nullable(false)->change();

            $table->string('transaction_id')->nullable(false)->change();

            $table->timestamp('payment_date')->nullable(false)->change();

        });
    }
};