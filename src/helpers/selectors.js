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
