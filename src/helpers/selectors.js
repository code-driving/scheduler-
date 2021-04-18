export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let infoForDay = state.days.find((obj) => obj.name === day);
  if (!infoForDay) {
    return [];
  }
  let appointmentsForDay = infoForDay.appointments;

  if (!appointmentsForDay) {
    return [];
  }
  const result = appointmentsForDay.map((id) => {
    if (state.appointments[id]) {
      return state.appointments[id];
    }
  });
  return result;
}

export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }
  const interviewData = {
    ...interview,
    interviewer: { ...state.interviewers[interview.interviewer] },
  };
  return interviewData;
};

export const getInterviewersForDay = (state, day) => {
  let infoForDay = state.days.find((obj) => obj.name === day);
  if (!infoForDay) {
    return [];
  }
  const interviewersForDay = infoForDay.interviewers;
  if (!interviewersForDay) {
    return [];
  }
  const interviews = interviewersForDay.map(
    (interviewerId) => state.interviewers[interviewerId]
  );

  return interviews;
};



