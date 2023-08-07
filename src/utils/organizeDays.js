function organizeDays(dayString) {
  if (dayString.length === 1) return dayString;
  if (dayString.length === 2) {
    if (dayString === "월일") return "일, 월";
    return `${(dayString[0], dayString[1])}`;
  }
  switch (dayString) {
    case "월화수":
      return "월 ~ 수";
    case "월화수목":
      return "월 ~ 목";
    case "월화수목금":
      return "월 ~ 금";
    case "월화수목금토":
      return "월 ~ 토";
    case "월화수목금토일":
      return "매일";
    case "화수목":
      return "화 ~ 목";
    case "화수목금":
      return "화 ~ 금";
    case "화수목금토":
      return "화 ~ 토";
    case "화수목금토일":
      return "화 ~ 일";
    case "수목금":
      return "수 ~ 금";
    case "수목금토":
      return "수 ~ 토";
    case "수목금토일":
      return "수 ~ 일";
    case "수목금토일월":
      return "수 ~ 월";
    case "목금토":
      return "목 ~ 토";
    case "목금토일":
      return "목 ~ 일";
    case "목금토일월":
      return "목 ~ 월";
    case "목금토일월화":
      return "목 ~ 화";
    case "금토일":
      return "금 ~ 일";
    case "금토일월":
      return "금 ~ 월";
    case "금토일월화":
      return "금 ~ 화";
    case "금토일월화수":
      return "금 ~ 수";
    case "토일월":
      return "토 ~ 월";
    case "토일월화":
      return "토 ~ 화";
    case "토일월화수":
      return "토 ~ 수";
    case "토일월화수목":
      return "토 ~ 목";
    case "일월화":
      return "일 ~ 화";
    case "일월화수":
      return "일 ~ 수";
    case "일월화수목":
      return "일 ~ 목";
    case "일월화수목금":
      return "일 ~ 금";
    default:
      return "";
  }
}

module.exports = organizeDays;
