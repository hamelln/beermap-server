var organizeDays = require("./organizeDays");

function getHoursStringForDay(day) {
  const { openTime, closeTime, breakTime } = day;
  if (openTime === "closed") {
    return "Closed";
  }
  let hoursString = `${openTime} - ${closeTime}`;
  if (breakTime) {
    const { startTime, endTime } = breakTime;
    hoursString += `, 브레이크 타임: ${startTime} - ${endTime}`;
  }
  return hoursString;
}

function groupDaysByOfficeHours(officeHours) {
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  return days.reduce((grouped, day) => {
    const hoursString = getHoursStringForDay(officeHours[day]);
    if (grouped[hoursString]) {
      grouped[hoursString].push(day);
    } else {
      grouped[hoursString] = [day];
    }
    return grouped;
  }, {});
}

function groupedOfficeHoursAsArray(groupedOfficeHours, officeHours) {
  const result = Object.entries(groupedOfficeHours).map(([_, days]) => {
    let daySeries = days.join("");
    const day = officeHours[daySeries[0]];

    if (day.openTime !== "closed") {
      const officeTime = `${day.openTime} - ${day.closeTime}`;
      const breakTime = day.breakTime
        ? `${day.breakTime.startTime} - ${day.breakTime.endTime}`
        : "none";

      return [daySeries, officeTime, breakTime];
    } else {
      return [daySeries, "closed", "none"];
    }
  });

  return result;
}

const summarizeOfficeHours = (officeHours) => {
  const groupedOfficeHours = groupDaysByOfficeHours(officeHours);
  const result = groupedOfficeHoursAsArray(groupedOfficeHours, officeHours);
  result.map((list) => {
    const days = list[0];
    const organizedDays = organizeDays(days);
    list[0] = organizedDays;
  });

  return result;
};

module.exports = summarizeOfficeHours;
