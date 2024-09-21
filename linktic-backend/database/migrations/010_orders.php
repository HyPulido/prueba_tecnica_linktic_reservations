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
        Schema::connection(getenv('DB_DATABASE'))->create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('note', 255)->nullable();
            $table->decimal('price', 10, 2);
            $table->string('address', 255)->nullable();
            $table->bigInteger('orders_statuses_id')->unsigned();
            $table->bigInteger('deliveries_types_id')->unsigned();
            $table->bigInteger('users_id')->unsigned();
            $table->timestamps();
            $table->foreign('orders_statuses_id')
            ->references('id')
                ->on('orders_statuses');
            $table->foreign('deliveries_types_id')
                ->references('id')
                ->on('deliveries_types')
                ->onDelete('cascade');
            $table->foreign('users_id')
                ->references('id')
                ->on('users');
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
        Schema::connection(getenv('DB_DATABASE'))->dropIfExists('orders');
    }
};
