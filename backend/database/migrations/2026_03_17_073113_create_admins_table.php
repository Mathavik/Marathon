<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    /**
     * Run the migrations
     */
    public function up(): void
    {
        // ✅ Create admins table
        Schema::create('admins', function (Blueprint $table) {
            $table->id(); // primary key
            $table->string('email')->unique(); // admin email
            $table->string('password'); // hashed password
            $table->timestamps(); // created_at, updated_at
        });

        // ✅ Insert default admin
        DB::table('admins')->insert([
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin123'),
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }

    /**
     * Reverse the migrations
     */
    public function down(): void
    {
        // ❌ Drop table if rollback
        Schema::dropIfExists('admins');
    }
};