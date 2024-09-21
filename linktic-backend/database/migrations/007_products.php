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
        Schema::connection(getenv('DB_DATABASE'))->create('products', function (Blueprint $table) {
            $table->id();
            $table->string('upc_code', 20);
            $table->string('name', 45);
            $table->string('description', 1024);
            $table->decimal('price', 10, 2);
            $table->integer('stock')->unsigned();
            $table->string('image', 255)->nullable();
            $table->bigInteger('products_categories_id')->unsigned();
            $table->bigInteger('products_units_measurement_id')->unsigned();
            $table->bigInteger('products_statuses_id')->unsigned();
            $table->timestamps();
            $table->foreign('products_categories_id')
            ->references('id')
                ->on('products_categories');
            $table->foreign('products_units_measurement_id')
                ->references('id')
                ->on('products_units_measurement')
                ->onDelete('cascade');
            $table->foreign('products_statuses_id')
                ->references('id')
                ->on('products_statuses');
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
        Schema::connection(getenv('DB_DATABASE'))->dropIfExists('products');
    }
};
