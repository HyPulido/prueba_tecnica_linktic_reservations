<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReservationsStatusesSeeder extends Seeder
{
    public function run()
    {
        // Disbaled forerign key
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        // Truncate table before to insert into table
        DB::table('reservations_statuses')->truncate();

        DB::table('reservations_statuses')->insert([
            ['id' => 1, 'name' => 'active', 'description' => 'active'],
            ['id' => 2, 'name' => 'inactive', 'description' => 'inactive'],
            ['id' => 3, 'name' => 'delete', 'description' => 'delete'],
        ]);
        // Enaled forerign key
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
