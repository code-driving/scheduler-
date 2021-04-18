export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

const getSpots = (state, day) => {
  const specificDay = state.days.find((eachDay) => eachDay.name === day);

  const emptyAppointments = specificDay.appointments.filter(
    (appointmentId) => state.appointments[appointmentId].interview === null
  );

  return emptyAppointments.length;
};

export function reducer(state, action) {
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
        days: state.days.map((currentDay) => ({
          ...currentDay,
          spots: getSpots(updatedState, currentDay.name),
        })),
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
