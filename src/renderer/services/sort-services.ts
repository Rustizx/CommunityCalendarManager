import { CalendarEventModel } from '../models/redux-models';

interface SortCalendarEventFromDate {
  event: CalendarEventModel;
  date: Date;
}

const shortMonths = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

export default function sortEvents(events: CalendarEventModel[]) {
  const newList: SortCalendarEventFromDate[] = [];
  events.forEach((event) => {
    const day = parseInt(event.date.day, 10);
    let month = 0;
    for (let i = 0; i < shortMonths.length; i += 1) {
      if (event.date.month.toLowerCase().substring(0, 3) === shortMonths[i]) {
        month = i;
        break;
      }
    }
    newList.push({ event, date: new Date(2020, month, day) });
  });
  newList.sort((a, b) => +new Date(a.date) - +new Date(b.date));
  return newList.map((o) => o.event);
}
