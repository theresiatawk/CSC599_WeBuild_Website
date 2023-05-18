<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('services', function (Blueprint $table) {
            $table->integer('year');
            $table->integer('month');
            $table->integer('is_open_mon');
            $table->integer('is_open_tue');
            $table->integer('is_open_wed');
            $table->integer('is_open_thu');
            $table->integer('is_open_fri');
            $table->integer('is_open_sat');
            $table->integer('is_open_sun');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('services', function (Blueprint $table) {
            //
        });
    }
};
