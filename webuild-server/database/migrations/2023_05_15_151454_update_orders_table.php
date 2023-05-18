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
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('time');
            $table->dropColumn('location');
            $table->dropColumn('created_at');
            $table->dropColumn('updated_at');
            $table->integer('warehouse_id');
            $table->string('date')->nullable()->change();
            $table->string('start_time')->nullable();
            $table->string('end_time')->nullable();
            $table->decimal('latitude');
            $table->decimal('longtitude');
            $table->string('location_description');
            $table->integer('price')->change();
            $table->string('quantity')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            //
        });
    }
};
