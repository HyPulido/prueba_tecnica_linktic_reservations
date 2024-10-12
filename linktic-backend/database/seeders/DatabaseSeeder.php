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
            ReservationsStatusesSeeder::class,
            RoomTypesSeeder::class
        ]);
    }
}
