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
        Schema::connection(getenv('DB_DATABASE'))->create('error_codes', function (Blueprint $table) {

            $table->string('code', 15)->primary();
            $table->smallInteger('status_code');
            $table->string('controller', 45);
            $table->string('message', 65);
            $table->string('description', 255);
            $table->string('cause', 255)->nullable();
            $table->string('code_app', 255)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection(getenv('DB_DATABASE'))->dropIfExists('error_codes');
    }
};