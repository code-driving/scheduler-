// import React, { useReducer, useEffect } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const getSpots = (state, day) => {
  const specificDay = state.days.find((eachDay) => eachDay.name === day);

  const emptyAppointments = specificDay.appointments.filter(
    (appointmentId) => state.appointments[appointmentId].interview === null
  );

  return emptyAppointments.length;
};

// function reducer(state, action) {
//   switch (action.type) {
//     case SET_DAY:
//       return {
//         ...state,
//         day: action.day,
//       };

//     case SET_APPLICATION_DATA:
//       return {
//         ...state,
//         days: action.days,
//         appointments: action.appointments,
//         interviewers: action.interviewers,
//       };

//     case SET_INTERVIEW: {
//       const updatedState = {
//         ...state,
//         appointments: {
//           ...state.appointments,
//           [action.id]: {
//             ...state.appointments[action.id],
//             interview: action.interview,
//           },
//         },
//       };
//       return {
//         ...updatedState,
//         days: state.days.map((currentDay) => ({
//           ...currentDay,
//           spots: getSpots(updatedState, currentDay.name),
//         })),
//       };
//     }
//     default:
//       throw new Error(
//         `Tried to reduce with unsupported action type: ${action.type}`
//       );
//   }
// }

// export default function useApplicationData(props) {
//   const [state, dispatch] = useReducer(reducer, {
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: {},
//   });

//   const setDay = (day) => dispatch({ type: SET_DAY, day });

//   useEffect(() => {
//     Promise.all([
//       axios.get("/api/days"),
//       axios.get("/api/appointments"),
//       axios.get("/api/interviewers"),
//     ]).then((all) => {
//       dispatch({
//         type: SET_APPLICATION_DATA,
//         days: all[0].data,
//         appointments: all[1].data,
//         interviewers: all[2].data,
//       });
//     });
//   }, []);

//   const bookInterview = (id, interview) => {
//     return axios
//       .put(`/api/appointments/${id}`, { interview })
//       .then((response) => {
//         dispatch({
//           type: SET_INTERVIEW,
//           id,
//           interview,
//         });
//       });
//   };

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
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

  return axios
    .put(`/api/appointments/${id}`, { interview })
    .then((response) => {
      // setState({
      //   ...state,
      //   appointments,
      // });
      setState((prev) => {
        return {
          ...prev,
          appointments,
          days: state.days.map((currentDay) => ({
            ...currentDay,
            spots: getSpots(state, currentDay.name),
          })),
        };
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
      setState((prev) => {
        return {
          ...prev,
          appointments,
          days: state.days.map((currentDay) => ({
            ...currentDay,
            spots: getSpots(state, currentDay.name),
          })),
        };
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
