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
        Schema::connection(getenv('DB_DATABASE'))->create('products_orders', function (Blueprint $table) {
            $table->id();
            $table->integer('quantity')->unsigned();
            $table->bigInteger('products_id')->unsigned();
            $table->bigInteger('orders_id')->unsigned();
            $table->foreign('products_id')
                ->references('id')
                ->on('products');
            $table->foreign('orders_id')
                ->references('id')
                ->on('orders')
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
        Schema::connection(getenv('DB_DATABASE'))->dropIfExists('products_orders');
    }
};
