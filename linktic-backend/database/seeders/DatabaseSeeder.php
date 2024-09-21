<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            ErrorCodesSeeder::class,
            StatusSeeder::class,
            RolesSeeder::class,
            ProductsCategoriesSeeder::class,
            ProductsStatusesSeeder::class,
            OrdersStatusesSeeder::class,
            ProductsUnitsMeasurementSeeder::class,
            DeliveriesTypesSeeder::class
        ]);
    }
}
