<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::connection(getenv('DB_DATABASE'))->create('room_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', 25);
            $table->string('description', 64);
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
        Schema::connection(getenv('DB_DATABASE'))->dropIfExists('room_types');
    }
};
