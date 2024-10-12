<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Utilities\BaseApp;
use App\Utilities\ReservationUtility;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;


class ReservationController extends Controller
{
    use BaseApp;

    public function index(Request $request)
    {
        $error_code = 'RNIX200';
        $data = null;
        try {
            $reservationTable = new Reservation;

            $search = $request->all();

            if (Auth::user()->isAdmin()) {
                $reservationsData = $reservationTable->getReservations($search);
            } else {
                $reservationsData = $reservationTable->getReservations($search, Auth::user()->id);
            }

            if (isset($reservationsData) && count($reservationsData) > 0) {
                $data = $this->setCustomizePagination($this->parseArrayToPaginate(new Collection($reservationsData)));
            } else {
                $error_code = 'RNIX402';
            }
        } catch (\Exception $e) {
            $error_code = "RNIX500";
            $data['error'] = array($this->getException($e));
        }
        return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => $data, 'function' => __FUNCTION__, 'class' => __CLASS__));
    }

    public function store(Request $request)
    {
        $error_code = 'RNSE201';
        $data = null;
        try {
            if ($this->validateRequiredFields($request, array('and' => array('date', 'time', 'number_people', 'duration'))) && $this->validateRequiredFields($request, array('or' => array('restaurants_id', 'rooms_id')))) {
                $reservationTable = new Reservation;
                $user_id = Auth::user()->id;

                $reservationData = ['date' => $request->date, 'time' => $request->time, 'number_people' => $request->number_people, 'duration' => $request->duration, 'users_id' => $user_id, 'restaurants_id' => $request->restaurants_id, 'reservations_statuses_id' =>  1];

                if (isset($request->restaurants_id)) {
                    $reservationData['restaurants_id'] = $request->restaurants_id;
                } else {
                    $reservationData['rooms_id'] = $request->rooms_id;
                }

                $createReservation = $reservationTable->createReservation($reservationData);
                if ($createReservation) {
                    $data['id'] = $createReservation->id;
                } else {
                    $error_code = 'RNSE402';
                }
            } else {
                $error_code = "RNSE405";
            }
        } catch (\Exception $e) {
            $error_code = "RNSE500";
            $data['error'] = array($this->getException($e));
        }

        return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => $data, 'function' => __FUNCTION__, 'class' => __CLASS__));
    }

    public function update($id, Request $request)
    {
        $error_code = 'RNUE201';
        $data = null;
        try {
            if ($this->validateRequiredFields($request, array('and' => array('id')))) {
                $reservationTable = new Reservation;

                $reservationtData = [];

                if (isset($request->date)) {
                    $reservationtData['date'] = $request->date;
                }

                if (isset($request->time)) {
                    $reservationtData['time'] = $request->time;
                }

                if (isset($request->number_people)) {
                    $reservationtData['number_people'] = $request->number_people;
                }

                if (isset($request->duration)) {
                    $reservationtData['duration'] = $request->duration;
                }

                if (isset($request->restaurants_id)) {
                    $reservationtData['restaurants_id'] = $request->restaurants_id;
                }


                if (Auth::user()->isAdmin()) {
                    $updateReservation = $reservationTable->updateReservation($id, $reservationtData);
                } else {
                    $updateReservation = $reservationTable->updateReservation($id, $reservationtData, Auth::user()->id);
                }


                if ($updateReservation) {
                    $data['id'] = $id;
                } else {
                    $error_code = 'RNUE402';
                }
            } else {
                $error_code = "RNUE405";
            }
        } catch (\Exception $e) {
            $error_code = "RNUE500";
            $data['error'] = array($this->getException($e));
        }
        return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => $data, 'function' => __FUNCTION__, 'class' => __CLASS__));
    }


    public function show($reservation_id)
    {
        $error_code = 'RNSW200';
        $data = null;
        try {
            $reservationTable = new Reservation;

            if (Auth::user()->isAdmin()) {
                $getReservationById = $reservationTable->getReservationById($reservation_id);
            } else {
                $getReservationById = $reservationTable->getReservationById($reservation_id, Auth::user()->id);
            }

            if (isset($getReservationById) && count($getReservationById) > 0) {
                $data = $this->setCustomizePagination($this->parseArrayToPaginate(new Collection($getReservationById)));
            } else {
                $error_code = 'RNSW402';
            }
        } catch (\Exception $e) {
            $error_code = "RNSW500";
            $data['error'] = array($this->getException($e));
        }
        return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => $data, 'function' => __FUNCTION__, 'class' => __CLASS__));
    }


    public function delete($id)
    {
        $error_code = 'RNDE200';
        $data = null;
        try {
            $reservationTable = new Reservation;

            if (Auth::user()->isAdmin()) {
                $deleteReservation = $reservationTable->deleteReservation($id);
            } else {
                $deleteReservation = $reservationTable->deleteReservation($id, Auth::user()->id);
            }

            if ($deleteReservation) {
                $data['id'] = $id;
            } else {
                $error_code = 'RNDE402';
            }
        } catch (\Exception $e) {
            $error_code = "RNDE500";
            $data['error'] = array($this->getException($e));
        }
        return $this->setCustomizeResponse(array('error_code' => $error_code, 'data' => $data, 'function' => __FUNCTION__, 'class' => __CLASS__));
    }
}
