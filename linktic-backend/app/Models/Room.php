<?php

namespace App\Models;

use App\Utilities\BaseApp;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{

    use BaseApp;
    protected $table = "rooms";
    protected $fillable = ['id', 'name', 'address', 'phone', 'ability', 'created_at', 'updated_at'];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    // public function isAvailable($date, $time, $peopleCount)
    // {
    //     // Combina la fecha y la hora en un solo objeto DateTime
    //     $dateTime = \Carbon\Carbon::parse("$date $time");

    //     // Verifica si la cantidad de personas excede la capacidad de la sala
    //     if ($peopleCount > $this->ability) {
    //         return false; // La sala no puede albergar esa cantidad de personas
    //     }

    //     // Calcula el rango de tiempo que ocuparía la reserva
    //     $startTime = $dateTime->copy(); // Horario de inicio
    //     $endTime = $startTime->copy()->addHours(1); // Supongamos que la reserva dura 1 hora

    //     // Verifica si ya hay reservas en ese rango de tiempo
    //     $reservationExists = Reservation::where('room_id', $this->id)
    //         ->where(function ($query) use ($startTime, $endTime) {
    //             $query->whereBetween('start_time', [$startTime, $endTime])
    //                 ->orWhereBetween('end_time', [$startTime, $endTime])
    //                 ->orWhere(function ($query) use ($startTime, $endTime) {
    //                     $query->where('start_time', '<=', $startTime)
    //                         ->where('end_time', '>=', $endTime);
    //                 });
    //         })
    //         ->exists();

    //     return !$reservationExists; // Devuelve true si no hay reservas
    // }



    // public static function isAvailable($room_id, $date, $time, $people_count, $duration)
    // {
    //     // Encuentra la sala por ID
    //     $room = self::find($room_id);

    //     if (!$room) {
    //         return false; // La sala no existe
    //     }

    //     // Combina la fecha y la hora en un solo objeto DateTime
    //     $dateTime = \Carbon\Carbon::parse("$date $time");

    //     // Verifica si la cantidad de personas excede la capacidad de la sala
    //     if ($people_count > $room->ability) {
    //         return false; // La sala no puede albergar esa cantidad de personas
    //     }

    //     // Calcula el rango de tiempo que ocuparía la reserva
    //     $startTime = $dateTime->copy(); // Horario de inicio
    //     $endTime = $startTime->copy()->addMinutes($duration); // Supongamos que la reserva dura 1 hora

    //     // Verifica si ya hay reservas en ese rango de tiempo
    //     $reservationExists = Reservation::where('room_id', $room->id)
    //         ->where(function ($query) use ($startTime, $endTime) {
    //             $query->whereBetween('start_time', [$startTime, $endTime])
    //                 ->orWhereBetween('end_time', [$startTime, $endTime])
    //                 ->orWhere(function ($query) use ($startTime, $endTime) {
    //                     $query->where('start_time', '<=', $startTime)
    //                         ->where('end_time', '>=', $endTime);
    //                 });
    //         })
    //         ->exists();

    //     return !$reservationExists; // Devuelve true si no hay reservas
    // }


    public static function isAvailable($room_id, $date, $time, $people_count, $duration)
    {
        // Encuentra la sala por ID
        $room = self::find($room_id);

        if (!$room) {
            return false; // La sala no existe
        }

        // Combina la fecha y la hora en un solo objeto DateTime
        $dateTime = \Carbon\Carbon::parse("$date $time");

        // Verifica si la cantidad de personas excede la capacidad de la sala
        if ($people_count > $room->ability) {
            return false; // La sala no puede albergar esa cantidad de personas
        }

        // Calcula el rango de tiempo que ocuparía la reserva
        $startTime = $dateTime->copy(); // Horario de inicio
        $endTime = $startTime->copy()->addMinutes($duration); // Duración de la reserva

        // Verifica si ya hay reservas en ese rango de tiempo
        $reservationExists = Reservation::where('rooms_id', $room->id)
            ->where(function ($query) use ($startTime, $endTime) {
                $query->whereBetween('date', [$startTime->toDateString(), $endTime->toDateString()])
                ->where(function ($q) use ($startTime, $endTime) {
                    $q->whereBetween('time', [$startTime->toTimeString(), $endTime->toTimeString()])
                        ->orWhere(function ($q) use ($startTime, $endTime) {
                            $q->where('time', '<=', $startTime->toTimeString())
                            ->where('time', '>=', $endTime->toTimeString());
                        });
                });
            })
            ->exists();

        return !$reservationExists; // Devuelve true si no hay reservas
    }
   
}
