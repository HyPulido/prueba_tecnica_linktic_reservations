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
        Schema::connection(getenv('DB_DATABASE'))->create('users', function (Blueprint $table) {
            $table->id();
            $table->string('identification_type', 5)->nullable();
            $table->string('identification_number', 20)->nullable()->unique();
            $table->string('email', 45)->unique();
            $table->string('password', 64);
            $table->string('first_name', 30);
            $table->string('last_name', 30);
            $table->string('profile_image_url', 255)->nullable();
            $table->string('phone_area_code', 5)->nullable();
            $table->string('phone_number', 15)->unique();
            $table->bigInteger('status_id')->unsigned();
            $table->bigInteger('roles_id')->unsigned();
            $table->timestamps();
            $table->foreign('status_id')
                ->references('id')
                ->on('status');
            $table->foreign('roles_id')
                ->references('id')
                ->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection(getenv('DB_DATABASE'))->dropIfExists('users');
    }
};
