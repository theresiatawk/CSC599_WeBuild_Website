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
            $table->dropColumn('year');
            $table->dropColumn('month');
            $table->dropColumn('is_open_mon');
            $table->dropColumn('is_open_tue');
            $table->dropColumn('is_open_wed');
            $table->dropColumn('is_open_thu');
            $table->dropColumn('is_open_fri');
            $table->dropColumn('is_open_sat');
            $table->dropColumn('is_open_sun');
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
