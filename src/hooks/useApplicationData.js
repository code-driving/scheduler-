import React, { useReducer, useEffect } from "react";
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

function reducer(state, action) {
  switch (action.type) {
    
    case SET_DAY:
      return {
        ...state,
        day: action.day,
      };
      
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      };
      
    case SET_INTERVIEW: {
      const updatedState = {
        ...state,
        appointments: {
          ...state.appointments,
          [action.id]: {
            ...state.appointments[action.id],
            interview: action.interview,
          },
        },
      };
      return {
        ...updatedState,
        days: state.days.map(currentDay => ({
          ...currentDay,
          spots: getSpots(updatedState, currentDay.name)
        }))
      }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData(props) {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  }); // ?

  const setDay = (day) => dispatch({ type: SET_DAY });
  
    useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch ({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

}

// export default function useApplicationData(props) {
//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: {},
//   });

//   useEffect(() => {
//     Promise.all([
//       axios.get("/api/days"),
//       axios.get("/api/appointments"),
//       axios.get("/api/interviewers"),
//     ]).then((all) => {
//       setState((prev) => ({
//         ...prev,
//         days: all[0].data,
//         appointments: all[1].data,
//         interviewers: all[2].data,
//       }));
//     });
//   }, []);

//   const setDay = (day) => setState({ ...state, day });

  // const getSpots = (state, day) => {
  //   const specificDay = state.days.find((eachDay) => eachDay.name === day);
  //   console.log(specificDay)
  //   const allAppointmentsPerDay = specificDay.appointments

  //   // if (!allAppoitments) {
  //   //   return [];
  //   // }
  //   console.log("allAppointmentsPerDay==>", allAppointmentsPerDay)
  //   const emptyAppointments = specificDay.appointments.filter(
  //     (appointmentId) => state.appointments[appointmentId].interview === null
  //   );

  //   return emptyAppointments.length;
  // };
//   function getSpots (state, day) {
//     const found = state.days.find(eachDay => eachDay.name === eachDay)
//     // return found.appointments.reduce((accumulator, app) => {
//     //   return state.appointments[app].interview ? accumulator : accumulator + 1;
//     // }, 0)

//     console.log(found)
//   }
//   // const spots = getSpots(state, state.day)

//   function bookInterview(id, interview) {
//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview },
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment,
//     };
//     const days = state.days.map((day) => ({
//       ...day,
//       spots: getSpots(state, day.name)
//     }));

//     return axios
//     .put(`/api/appointments/${id}`, { interview })
//     .then((response) => {
//       setState({
//         ...state,
//         appointments,
//         days
//       });
//     });
//   }

//   function cancelInterview(id) {
//     const appointment = {
//       ...state.appointments[id],
//       interview: null,
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment,
//     };

//     return axios.delete(`/api/appointments/${id}`).then((response) => {
//       setState({
//         ...state,
//         appointments,

//       });
//     });
//   }

//   return {
//     state,
//     setDay,
//     bookInterview,
//     cancelInterview
//   };
// }
