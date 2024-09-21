<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    public function run()
    {
        // Disbaled forerign key
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        // Truncate table before to insert into table
        DB::table('status')->truncate();

        DB::table('status')->insert([
            ['id' => 1, 'name' => 'active', 'description' => 'active'],
            ['id' => 2, 'name' => 'inactive', 'description' => 'inactive'],
            ['id' => 3, 'name' => 'delete', 'description' => 'delete'],
        ]);
        // Enaled forerign key
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
