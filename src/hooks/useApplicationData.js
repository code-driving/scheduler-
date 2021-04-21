import React, { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "../reducers/application.js";

export default function useApplicationData(props) {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });

      const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
      socket.onopen = () => {
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === SET_INTERVIEW) {
            dispatch({
              type: SET_INTERVIEW,
              id: data.id,
              interview: data.interview,
            });
          } else {
            dispatch({
              type: SET_INTERVIEW,
              id: data.id,
              interview: null,
            });
          }
        };
      };
      return () => {
        socket.close();
      };
    });
  }, []);

  const bookInterview = (id, interview) => {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview,
        });
      });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview: null,
      });
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
