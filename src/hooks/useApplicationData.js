import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  
  // const getSpots = (state, day) => {
  //   const specificDay = state.days.find((eachDay) => eachDay.name === day);
  //   console.log(specificDay)
  //   const allAppointmentsPerDay = specificDay.appointments
    
  //   // if (!allAppoitments) {
  //   //   return [];
  //   // }
  //   console.log("allAppointmentsPerDay==>", allAppointmentsPerDay)
  //   // const emptyAppointments = specificDay.appointments.filter(
  //   //   (appointmentId) => state.appointments[appointmentId].interview === null
  //   // );
  
  //   // return emptyAppointments.length;
  // };
  function getSpots (state, day) {
    const found = state.days.find(d => d.name === day)
    // return found.appointments.reduce((a, c) => {
    //   return state.appointments[c].interview ? a : a + 1;
    // }, 0)
    debugger
    console.log(found)
  }
  const setDay = (day) => setState({ ...state, day });
  const spots = getSpots(state, state.day)
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = state.days.map((day) => ({
      ...day,
      spots: getSpots(...state, day.name)
    }));
    
    return axios
    .put(`/api/appointments/${id}`, { interview })
    .then((response) => {
      setState({
        ...state,
        appointments,
        days
      });
    });
  }
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState({
        ...state,
        appointments,
        
      });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}

