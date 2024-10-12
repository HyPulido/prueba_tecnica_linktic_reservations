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
        Schema::connection(getenv('DB_DATABASE'))->create('rooms', function (Blueprint $table) {
            $table->id();
            $table->double('night_price');
            $table->integer('ability')->unsigned();
            $table->bigInteger('hotels_id')->unsigned();
            $table->bigInteger('room_types_id')->unsigned();
            $table->timestamps();
            $table->foreign('hotels_id')
            ->references('id')
                ->on('hotels');
            $table->foreign('room_types_id')
                ->references('id')
                ->on('room_types')
                ->onDelete('cascade');
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
        Schema::connection(getenv('DB_DATABASE'))->dropIfExists('rooms');
    }
};
