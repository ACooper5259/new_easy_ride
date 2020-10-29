import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ModalBox from "./Modal";
import MenuAppBar from "../Layout/NavBar";
import { makeStyles } from '@material-ui/core/styles'; 


moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const useStyles = makeStyles({
  calendar: {
    fontFamily: 'Roboto',
    border: 0,
    borderRadius: 3,
    padding: '0 30px',
    color: '#004578'
  },
});



const convertDate = (date) => {
  return moment.utc(date).toDate();
};

const updatedEv = (appointments) => {
  const newArr = appointments.map((item) => ({
    title: `${item.attributes.event_type}`,
    start: convertDate(item.attributes.start_time),
    end: convertDate(item.attributes.end_time),
  }));
  return newArr;
};

const MyCalendar = (props) => {
  const styles = useStyles();
  const { currentUser, setCurrentUser } = props;
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [stupid, setStupid] = useState(1);

  // const openCloseModal = () => {
  //   setModal(!modal);
  // };
  const handleSelectSlot = ({ start, end, resourceId }) => {
    // const title = window.prompt("new event");
    console.log("called::", start);
    console.log("called::", end);
    setModal(true);
  };

  useEffect(() => {
    const URLbookings = "http://localhost:3000/api/v1/bookings";
    axios.get(URLbookings).then((response) => {
      let bookingAppointments = response.data.data;
      // console.log("bookingAppointments:", bookingAppointments);
      let formattedBookings = updatedEv(bookingAppointments);
      // console.log("formattedBookings:", formattedBookings);
      setEvents((prev) => [...prev, ...formattedBookings]);
    });
  }, [stupid]);
  console.log("events rendered:", events);

  
  const doBooking = (horse, email, bookingType) => {
    const info = {horse, email, eventType: bookingType};
    console.log(JSON.stringify(info));
    axios.post('http://localhost:3000/api/v1/rides', info)
      .then(response => {
        setStupid(stupid + 1);
        console.log(response);
      })
      .catch(error => console.log(error));
  };

  // Setting start time and end time props for weeks days
  const minTime = new Date();
  minTime.setHours(8,30,0);
  const maxTime = new Date();
  maxTime.setHours(20,30,0);


  return (
    <div>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <ModalBox  modal={modal} setModal={setModal} doBooking={doBooking} />
      <Calendar 
        className={styles.calendar}
        selectable
        min={new Date(0, 0, 0, 6, 0, 0)}
        max={new Date(0, 0, 0, 19, 0, 0)}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week","day"]}
        min = {minTime}
        max = {maxTime}
        // style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
      />
    </div>
  );
};

export default MyCalendar;
