import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";
import {
  reducer,
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "../reducer/reducer.js";

const getSpots = (state, day) => {
  const specificDay = state.days.find((eachDay) => eachDay.name === day);

  const emptyAppointments = specificDay.appointments.filter(
    (appointmentId) => state.appointments[appointmentId].interview === null
  );

  return emptyAppointments.length;
};

// export default function useApplicationData(props) {
//   const [state, dispatch] = useReducer(reducer, {
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: {},
//   });

// const setDay = (day) => dispatch({ type: SET_DAY, day });

// useEffect(() => {
//   Promise.all([
//     axios.get("/api/days"),
//     axios.get("/api/appointments"),
//     axios.get("/api/interviewers"),
//   ]).then((all) => {
//     dispatch({
//       type: SET_APPLICATION_DATA,
//       days: all[0].data,
//       appointments: all[1].data,
//       interviewers: all[2].data,
//     });
//   });
// }, []);

// const bookInterview = (id, interview) => {
//   return axios
//     .put(`/api/appointments/${id}`, { interview })
//     .then((response) => {
//       dispatch({
//         type: SET_INTERVIEW,
//         id,
//         interview,
//       });
//     });
// };

// const cancelInterview = (id) => {
//   return axios
//     .delete(`/api/appointments/${id}`)
//     .then((response) => {
//       dispatch({
//         type: SET_INTERVIEW,
//         id,
//         interview: null,
//     });
//   });
// };

//   return {
//     state,
//     setDay,
//     bookInterview,
//     cancelInterview
//   };
// }

// VERSION WITHOUT REDUCER. SOMETHING IS WRONG WITH THE STATE :) NEED TO WORK AT IT
//DOES NOT COUNT CORRECTLY

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

  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: { ...interview },
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment,
    // };

    const updatedState = {
      ...state,
      appointments: {
        ...state.appointments,
        [id]: {
          ...state.appointments[id],
          interview: { ...interview },
        },
      },
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({
          ...updatedState,
          days: state.days.map((currentDay) => ({
            ...currentDay,
            spots: getSpots(updatedState, currentDay.name),
          })),
        });
      });
  }

  function cancelInterview(id) {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null,
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment,
    // };
    const updatedState = {
      ...state,
      appointments: {
        ...state.appointments,
        [id]: {
          ...state.appointments[id],
          interview: null,
        },
      },
    };
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState({
        ...updatedState,
        days: state.days.map((currentDay) => ({
          ...currentDay,
          spots: getSpots(updatedState, currentDay.name),
        })),
      });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
