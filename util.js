import moment from "moment";

export const getCalenderMonth = (calenderDate) => {
  const calendar = [];
  const selected = moment(calenderDate);
  const currentDate = moment();
  const startMonth = selected.clone().startOf("month");
  const startMonthLessDay = startMonth.clone().subtract(1, "day");
  const startDay = startMonth.clone().startOf("week");
  const endMonth = selected.clone().endOf("month");
  const endMonthLessDay = endMonth.clone().subtract(1, "day");
  const endDay = endMonth.clone().endOf("week");

  let date = startDay.clone().subtract(1, "day");
  while (date.isBefore(endDay, "day"))
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => {
          return date.isBefore(startMonthLessDay) ||
            date.isAfter(endMonthLessDay)
            ? {
                date: date.add(1, "day").clone(),
                isCurrentMonth: false,
                isCurrentDate: false,
                isFuture: date.isAfter(currentDate),
                isPast: date.isBefore(currentDate),
                isWeekend: date.day() === 6 || date.day() === 0,
              }
            : {
                date: date.add(1, "day").clone(),
                isCurrentMonth: true,
                isCurrentDate: date.isSame(currentDate, "date"),
                isFuture: date.isAfter(currentDate),
                isPast: date.isBefore(currentDate),
                isWeekend: date.day() === 6 || date.day() === 0,
              };
        })
    );
  return calendar;
};

export const HOURS = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

export const MINUTES = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
];
