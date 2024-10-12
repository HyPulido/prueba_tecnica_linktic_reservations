<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $table = "reservations";

    protected $fillable = [
        'id',
        'date',
        'time',
        'number_people',
        'duration',
        'reservations_statuses_id',
        'users_id',
        'restaurants_id',
        'rooms_id',
        'created_at',
        'updated_at'
    ];

    public $timestamps = false;


    function getReservations($search, $user_id = null)
    {
        $query = $this::select(
            'reservations.*',
            'reservations_statuses.name AS reservations_statuses_name',
            'restaurants.name AS restaurant_name',
            'hotels.id AS hotel_id',
            'hotels.name AS hotel_name',
        )
            ->join('reservations_statuses', 'reservations.reservations_statuses_id', '=', 'reservations_statuses.id')
            ->leftJoin('restaurants', 'reservations.restaurants_id', '=', 'restaurants.id')
            ->leftJoin('rooms', 'reservations.rooms_id', '=', 'rooms.id')
            ->leftJoin('hotels', 'rooms.hotels_id', '=', 'hotels.id');

        if (!empty($search->restaurant)) {
            $query->where('restaurants.name', 'like', '%' . $search->restaurant . '%');
        }

        if (!empty($search->date)) {
            $query->where('reservations.date', '=', $search->date);
        }

        if (!empty($search->hotel)) {
            $query->where('hotels.name', 'like', '%' . $search->hotel . '%');
        }

        if (isset($user_id)) {
            $query->where('reservations.users_id', '=', $user_id);
        }
        return $query->get();
    }

    public function createReservation($order)
    {
        foreach ($order as $key => $value) {
            $this->$key = $value;
        }
        $this->save();
        return $this;
    }

    function getReservationById($id, $user_id = null)
    {
        $query = $this::select(
            'reservations.*',
            'reservations_statuses.name AS reservations_statuses_name',
            'restaurants.name AS restaurant_name',
            'hotels.id AS hotel_id',
            'hotels.name AS hotel_name',
        )
            ->join('reservations_statuses', 'reservations.reservations_statuses_id', '=', 'reservations_statuses.id')
            ->leftJoin('restaurants', 'reservations.restaurants_id', '=', 'restaurants.id')
            ->leftJoin('rooms', 'reservations.rooms_id', '=', 'rooms.id')
            ->leftJoin('hotels', 'rooms.hotels_id', '=', 'hotels.id')
            ->where('reservations.id', $id);

        if (isset($user_id)) {
            $query->where('reservations.users_id',  $user_id);
        }

        return $query->get();
    }


    public function deleteReservation($id, $user_id = null)
    {
        if (isset($user_id)) {
            return $this->where('id', $id)->where('users_id', $user_id)->delete();
        } else {
            return $this->where('id', $id)->delete();
        }
    }

    function updateReservation($id,$reservation)
    {
        if (isset($user_id)) {
            return $this->where('id', $id)->where('users_id', $user_id)->update($reservation);
        } else {
            return $this->where('id', $id)->update($reservation);
        }
    }
}
