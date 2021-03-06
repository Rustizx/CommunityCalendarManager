import { SortCalendarEventFromDate } from '../models/ipc-models';
import { CalendarEventModel } from '../models/calendar-model';
import { shortMonths } from '../common/constants';

function uniqByKeepLast(
  data: CalendarEventModel[],
  key: (arg0: CalendarEventModel) => any
) {
  return [...new Map(data.map((x) => [key(x), x])).values()];
}

export default function sortEvents(events: CalendarEventModel[]) {
  const newList: SortCalendarEventFromDate[] = [];
  events.forEach((event) => {
    let month = 0;
    for (let i = 0; i < shortMonths.length; i += 1) {
      if (event.date.month.toLowerCase().substring(0, 3) === shortMonths[i]) {
        month = i;
        break;
      }
    }
    newList.push({
      event,
      date: new Date(2020, month, parseInt(event.date.day, 10)),
    });
  });
  newList.sort((a, b) => +new Date(a.date) - +new Date(b.date));
  return uniqByKeepLast(
    newList.map((o) => o.event),
    (it) => it.name
  );
}
