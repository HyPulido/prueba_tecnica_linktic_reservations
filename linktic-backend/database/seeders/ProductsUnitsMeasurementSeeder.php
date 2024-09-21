<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsUnitsMeasurementSeeder extends Seeder
{
    public function run()
    {
        // Disbaled forerign key
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        // Truncate table before to insert into table
        DB::table('products_units_measurement')->truncate();

        DB::table('products_units_measurement')->insert([
            ['id' => 1, 'name' => 'Unidad', 'description' => 'Unidad'],
            ['id' => 2, 'name' => 'Libra', 'description' => 'Libra'],
        ]);
        // Enaled forerign key
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
