<?php

namespace App\Utilities;

use App\Models\Restaurant;
use App\Models\Restaurants;
use App\Models\Room;

class ReservationUtility{

    public function verifiedAvailability($data)
    {
        if (isset($data['rooms_id'])) {
            $roomTable = new Room;
            return $roomTable->isAvailable($data['rooms_id'], $data['date'], $data['time'], $data['number_people'], $data['duration']);
        } else if (isset($data['restaurants_id'])) {
            $restaurantTable = new Restaurant;
            return $restaurantTable->isAvailable($data['restaurants_id'], $data['date'], $data['time'], $data['number_people'], $data['duration']);
        }
    }
}
