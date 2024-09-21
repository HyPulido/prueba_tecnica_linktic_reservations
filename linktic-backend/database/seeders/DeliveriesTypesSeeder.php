<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DeliveriesTypesSeeder extends Seeder
{
    public function run()
    {
        // Disbaled forerign key
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        // Truncate table before to insert into table
        DB::table('deliveries_types')->truncate();

        DB::table('deliveries_types')->insert([
            ['id' => 1, 'name' => 'En tienda', 'description' => 'En tienda'],
            ['id' => 2, 'name' => 'Domicilio', 'description' => 'Domicilio'],
        ]);
        // Enaled forerign key
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
