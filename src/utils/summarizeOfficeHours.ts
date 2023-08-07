import OfficeHours from "../models/OfficeHours";
import organizeDays from "./organizeDays";

interface BreakTime {
  startTime: string;
  endTime: string;
}

interface OfficeHour {
  openTime: string;
  closeTime: string;
  breakTime?: BreakTime;
}

interface GroupedOfficeHours {
  [K: string]: string[];
}

function getHoursStringForDay(day: OfficeHour): string {
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

function groupDaysByOfficeHours(officeHours: OfficeHours): GroupedOfficeHours {
  const days: string[] = ["월", "화", "수", "목", "금", "토", "일"];

  return days.reduce((grouped: GroupedOfficeHours, day) => {
    const hoursString: string = getHoursStringForDay(officeHours[day]);
    if (grouped[hoursString]) {
      grouped[hoursString].push(day);
    } else {
      grouped[hoursString] = [day];
    }
    return grouped;
  }, {});
}

function groupedOfficeHoursAsArray(
  groupedOfficeHours: GroupedOfficeHours,
  officeHours: OfficeHours
): string[][] {
  const result = Object.entries(groupedOfficeHours).map(
    ([_, days]: [string, string[]]) => {
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
    }
  );

  return result;
}

const summarizeOfficeHours = (officeHours: OfficeHours) => {
  const groupedOfficeHours = groupDaysByOfficeHours(officeHours);
  const result = groupedOfficeHoursAsArray(groupedOfficeHours, officeHours);
  result.map((list) => {
    const days = list[0];
    const organizedDays = organizeDays(days);
    list[0] = organizedDays;
  });

  return result;
};

export default summarizeOfficeHours;
