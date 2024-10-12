import React, { useEffect, useState } from "react";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CSmartTable,
  CCard,
  CCardHeader,
  CCardBody,
  CTabContent,
  CTabPane,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CBadge,
  CForm,
  CCol,
  CFormInput,
  CModalFooter,
  CDatePicker,
  CFormSelect,
} from "@coreui/react-pro";

import * as LinkticService from "../../services/LinkticService";
import { Link } from "react-router-dom";
import { ReservationsItems } from "../../models/Reservations";
import { BIcon } from "../../components/icons/BIcon";
import { customMessage, getBadgeReservationsStatus, showToastTR } from "../../Utils/BaseApp";
import { cilPencil, cilPlus } from "@coreui/icons";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface ReservationsProps { }

export const Reservations: React.FC<ReservationsProps> = ({ }: ReservationsProps) => {
  const [reservations, setReservations] = useState<ReservationsItems[] | null>(null);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [details, setDetails] = useState<ReservationsItems>();
  const [visible, setVisible] = useState(false);
  const [validated, setValidated] = useState(false);
  const [editReservation, setEditReservation] = useState(false);

  interface Event {
    title: string;
    start: string;
  }
  // const [events, setEvents] = useState([]);
  const [events, setEvents] = useState<Event[]>([]); // Especifica el tipo de eventos aquí


  const getReservations = async () => {
    var response = await LinkticService.getReservations();

    if (response) {
      if (response.status === 200) {
        setReservations(response.data.items);

        // response.data.items.forEach(element => {
        //   setEvents({title: "dfi", start: element.date+" "+element.time});
        // });




        // const newEvents = response.data.items.map(element => ({
        //   title: "dfi", // Puedes ajustar esto según tus necesidades
        //   start: `${element.date} ${element.time}`
        // }));
        // setEvents(newEvents);


        const newEvents: Event[] = response.data.items.map(element => ({
          title: " - Reserva",
          start: `${element.date}T${element.time}`,
          id: element.id,
          date: element.date,
          time: element.time,
          number_people: element.number_people,
          duration: element.duration,
          // reservations_statuses_id: element.reservations_statuses_id,
          users_id: element.users_id,
          restaurants_id: element.restaurants_id,
          rooms_id: element.rooms_id,
          created_at: element.created_at,
          updated_at: element.updated_at,
          reservations_statuses_name: element.reservations_statuses_name,
          restaurant_name: element.restaurant_name,
          hotel_name: element.hotel_name,
        }));

        console.log("New Events");
        console.log(newEvents);
        setEvents(newEvents); // Establece el nuevo array de eventos

      }
    }
  };

  // useEffect(() => {
  //   const newEvents = response.data.items.map(element => ({
  //     title: "dfi", // Puedes ajustar esto según tus necesidades
  //     start: `${element.date} ${element.time}`
  //   }));

  //   setEvents(newEvents);
  // }, [response.data.items]); // Asegúrate de que esta dependencia esté correcta

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    number_people: 0,
    duration: 0,
    // reservations_statuses_id: 0,
    restaurants_id: 0,
    rooms_id: 0
  });

  useEffect(() => {

    if (details) {
      setFormData({
        date: details.date,
        time: details.time,
        number_people: details.number_people,
        duration: details.duration,
        // reservations_statuses_id: details.reservations_statuses_id,
        restaurants_id: details.restaurants_id,
        rooms_id: details.rooms_id
      });
    }
  }, [details]);

  // const showDetails = (message: ReservationsItems) => {
  //   if (message) {
  //     setDetails(message);
  //     setVisibleDetails(true);
  //   }
  // };

  useEffect(() => {
    getReservations();
  }, []);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    var { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setVisible(false);

      if (details) {

        setEditReservation(false);
        console.log("TODO::Aqui se debe llamar la api de editar");
        if (details?.id) {
          var response = await LinkticService.updateReservation(formData, details.id);

          if (response) {
            if (response?.status === 200) {
              showToastTR(customMessage(response.code_app), 200, "success");
            } else {
              showToastTR(customMessage(response.code_app), 2000, "error");
            }
          }
        } else {
          showToastTR("Selecciona un producto para actualizar", 2000, "error");
        }

      } else {
        console.log("TODO::Aqui se debe llamar la api de crear");
        var response = await LinkticService.createReservation(formData);

        if (response) {
          if (response?.status === 200) {
            showToastTR(customMessage(response.code_app), 200, "success");
          } else {
            showToastTR(customMessage(response.code_app), 2000, "error");
          }
        }
      }

      getReservations();

      // createAccount();
      setFormData({
        date: "",
        time: "",
        number_people: 0,
        duration: 0,
        // reservations_statuses_id: 0,
        restaurants_id: 0,
        rooms_id: 0
      });
    }
    setValidated(true);
  };

  function renderEventContent(eventInfo: any) {
    console.log(eventInfo);
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  // const handleDateClick = (arg: any) => {
  //   console.log(arg.dateStr);
  // }

  const handleEventClick = (arg: any) => {
    // console.log("handleEventClick");
    // console.log(arg);
    // console.log(arg.dateStr);

    console.log("Evento clicado:", arg);
    console.log("ID del evento:", arg.event.id); // Aquí accedes al ID
    console.log("ID del evento:", arg.event.date); // Aquí accedes al ID
    console.log("Detalles del evento:", arg.event); // Otros detalles del evento}
    
    console.log("reservations");
    console.log(reservations);

    // const reservationData = reservations?.find(reservation => reservation.id === arg.event.id);
    const reservationData = reservations?.find(reservation => reservation.id == arg.event.id);

    console.log("reservationData");
    console.log(reservationData);

    if (reservationData) {
      setEditReservation(true);
      setDetails(reservationData);
    
      setFormData({
        date: reservationData.date,
        time: reservationData.time,
        number_people: reservationData.number_people,
        duration: reservationData.duration,
        // reservations_statuses_id: reservationData.reservations_statuses_id,
        restaurants_id: reservationData.restaurants_id,
        rooms_id: reservationData.rooms_id
      });
      console.log(formData);
      setVisible(true);
    }
  }



  const handleDateClick = (arg: any) => {
    setEditReservation(false);

    setFormData({
      date: arg.dateStr,
      time: "",
      number_people: 0,
      duration: 0,
      // reservations_statuses_id: 0,
      restaurants_id: 0,
      rooms_id: 0
    });
    setVisible(true);
  };

  const [selectionType, setSelectionType] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');

  const handleSelectionChange = (e: any) => {
    setSelectionType(e.target.value);
    if (e.target.value === 'restaurant') {
      setSelectedHotel('');
      setSelectedRoom('');
    } else {
      setSelectedRoom(''); // Resetea habitación si selecciona hotel
    }
  };

  const handleHotelChange = (e: any) => {
    setSelectedHotel(e.target.value);
    // Aquí puedes cargar las habitaciones para el hotel seleccionado
  };

  // const handleRoomChange = (e: any) => {
  //   setSelectedRoom(e.target.value);
  // };
  const handleRestaurantsChange = (e: any) => {
    const restaurantsId = e.target.value;
    // setSelectedRoom(roomId);

    setFormData((prevFormData) => ({
      ...prevFormData,
      restaurants_id: restaurantsId, // Establece el ID de la habitación
    }));
  };


  const handleRoomChange = (e: any) => {
    const roomId = e.target.value;
    setSelectedRoom(roomId);

    setFormData((prevFormData) => ({
      ...prevFormData,
      rooms_id: roomId, // Establece el ID de la habitación
    }));
  };

  return (
    <div className="col-12">


      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
      />

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader closeButton>
          <CModalTitle id="LiveDemoExampleLabel">{details?.id ? 'Actualizar reserva' : 'Agregar reserva'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CCol md={12}>
              <CFormInput
                value={formData.date}
                type="text"
                name="date"
                minLength={1}
                placeholder="Ejm. 2024-10-14"
                feedbackValid="Luce bien!"
                feedbackInvalid="Por favor escriba una fecha valida."
                id="validationCustom02"
                label="Fecha"
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                value={formData.time}
                type="text"
                name="time"
                minLength={2}
                placeholder="08:00"
                feedbackValid="Luce bien!"
                feedbackInvalid="Por favor escriba una fecha valida para la reserva."
                id="validationCustom01"
                label="Hora"
                onChange={handleChange}
              />
            </CCol>

            <CCol md={12}>
              <CFormInput
                value={formData.number_people}
                type="text"
                name="number_people"
                minLength={1}
                placeholder="20.500"
                feedbackValid="Luce bien!"
                feedbackInvalid="Por favor escriba un número de personas valido para la reserva."
                id="validationCustom01"
                label="Número de personas"
                onChange={handleChange}
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                value={formData.duration}
                type="text"
                name="duration"
                minLength={0}
                placeholder="0"
                feedbackValid="Luce bien!"
                feedbackInvalid="Por favor escriba la duración valida para la reserva."
                id="validationCustom01"
                label="Duración (en minutos)"
                onChange={handleChange}
              />
            </CCol>          

            <CCol md={12}>
              <label htmlFor="selectionType">Selecciona una opción</label>
              <CFormSelect size="sm" className="mb-0" aria-label="Tipo de selección"  onChange={handleSelectionChange}>
                <option value="">Selecciona</option>
                <option value="restaurant">Restaurante</option>
                <option value="hotel">Hotel</option>
              </CFormSelect>
            </CCol>

            {selectionType === 'restaurant' && (
              <>
                <CCol md={12}>
                  <label htmlFor="">Selecciona un restaurante</label>
                  <CFormSelect size="sm" className="mb-0" aria-label="Selecciona restaurante" onChange={handleRestaurantsChange} name="restaurants_id" >
                    <option value="1">Restaurante 1</option>
                    <option value="2">Restaurante 2</option>
                    <option value="3">Restaurante 3</option>
                    <option value="4">Restaurante 4</option>
                  </CFormSelect>
                </CCol>
              </>
            )}

            {selectionType === 'hotel' && (
              <>
                <CCol md={12}>
                  <label htmlFor="">Selecciona un hotel</label>
                  <CFormSelect size="sm" className="mb-0" aria-label="Selecciona hotel" onChange={handleHotelChange}>
                    <option value="">Selecciona un hotel</option>
                    <option value="1">Hotel 1</option>
                    <option value="2">Hotel 2</option>
                  </CFormSelect>
                </CCol>

                {selectedHotel && (
                  <CCol md={12}>
                    <label htmlFor="">Selecciona una habitación</label>
                    <CFormSelect size="sm" className="mb-0" aria-label="Selecciona habitación" onChange={handleRoomChange} name="rooms_id">
                      <option value="">Selecciona una habitación</option>
                      <option value="1">Habitación 1</option>
                      <option value="2">Habitación 2</option>
                    </CFormSelect>
                  </CCol>
                )}
              </>
            )}


            <CModalFooter className="pb-0">
              <CButton color="light" onClick={() => setVisible(false)}>
                Cerrar
              </CButton>
              <CButton color="primary" type="submit">
                {editReservation ? "Actualizar reserva" : "Guardar reserva"}
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </div>
  );
};
