<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomTypesSeeder extends Seeder
{
    public function run()
    {
        // Disbaled forerign key
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        // Truncate table before to insert into table
        DB::table('room_types')->truncate();

        DB::table('room_types')->insert([
            ['id' => 1, 'name' => 'Sencilla', 'description' => 'Sencilla'],
            ['id' => 2, 'name' => 'Doble', 'description' => 'Doble'],
            ['id' => 3, 'name' => 'Suite', 'description' => 'Suite'],
        ]);
        // Enaled forerign key
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
