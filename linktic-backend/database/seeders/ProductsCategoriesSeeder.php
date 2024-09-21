<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsCategoriesSeeder extends Seeder
{
    public function run()
    {
        // Disbaled forerign key
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        // Truncate table before to insert into table
        DB::table('products_categories')->truncate();

        DB::table('products_categories')->insert([
            ['id' => 1, 'name' => 'Carne', 'description' => 'Carne'],
            ['id' => 2, 'name' => 'Lacteos', 'description' => 'Lacteos'],
            ['id' => 3, 'name' => 'Frutas', 'description' => 'Frutas'],
        ]);
        // Enaled forerign key
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
