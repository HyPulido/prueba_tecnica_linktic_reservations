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

        Schema::connection(getenv('DB_DATABASE'))->create('reservations', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->time('time');
            $table->integer('number_people')->unsigned();
            $table->integer('duration')->unsigned();
            $table->bigInteger('reservations_statuses_id')->unsigned();
            $table->bigInteger('users_id')->unsigned();
            $table->bigInteger('restaurants_id')->unsigned()->nullable();
            $table->bigInteger('rooms_id')->unsigned()->nullable();
            $table->timestamps();
            $table->foreign('reservations_statuses_id')
                ->references('id')
                ->on('reservations_statuses');
            $table->foreign('users_id')
                ->references('id')
                ->on('users');
            $table->foreign('restaurants_id')
                ->references('id')
                ->on('restaurants');
            $table->foreign('rooms_id')
                ->references('id')
                ->on('rooms');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::connection(getenv('DB_DATABASE'))->dropIfExists('reservations');
    }
};
