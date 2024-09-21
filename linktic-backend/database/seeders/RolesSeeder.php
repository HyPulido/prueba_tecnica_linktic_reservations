<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    public function run()
    {
        // Disbaled forerign key
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        // Truncate table before to insert into table
        DB::table('roles')->truncate();

        DB::table('roles')->insert([
            ['id' => 1, 'name' => 'admin', 'description' => 'administrator'],
            ['id' => 2, 'name' => 'developer', 'description' => 'developer'],
            ['id' => 3, 'name' => 'user', 'description' => 'user of the app'],
        ]);
        // Enaled forerign key
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
