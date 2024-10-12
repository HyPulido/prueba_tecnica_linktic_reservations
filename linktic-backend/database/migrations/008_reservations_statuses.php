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
        Schema::connection(getenv('DB_DATABASE'))->create('reservations_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('description', 50);
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
        Schema::connection(getenv('DB_DATABASE'))->dropIfExists('reservations_statuses');
    }
};
