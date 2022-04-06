/* eslint-disable no-console */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { CalendarEventModel } from '../../models/redux-models';

import { useAppSelector } from '../../hooks/redux-hooks';

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

interface SortCalendarEventFromDate {
  event: CalendarEventModel;
  date: Date;
}

export default function ListTable() {
  const calendar = useAppSelector((state) => state.calendar);

  function fetchFamilyCardEvents() {
    const l: CalendarEventModel[] = [];
    const fam = calendar.familyCards;
    for (let i = 0; i < fam.length; i += 1) {
      if (fam[i].order.amountOfCalendarsPurchased > 0) {
        for (let x = 0; x < fam[i].calendarEvents.length; x += 1) {
          l.push(fam[i].calendarEvents[x]);
        }
      }
    }
    return l;
  }

  function fetchBusinessCardEvents() {
    const l: CalendarEventModel[] = [];
    const fam = calendar.businessCards;
    for (let i = 0; i < fam.length; i += 1) {
      if (fam[i].order.amountOfCalendarsPurchased > 0) {
        for (let x = 0; x < fam[i].calendarEvents.length; x += 1) {
          l.push(fam[i].calendarEvents[x]);
        }
      }
    }
    return l;
  }

  function fetchClubCardEvents() {
    const l: CalendarEventModel[] = [];
    const fam = calendar.clubCards;
    for (let i = 0; i < fam.length; i += 1) {
      if (fam[i].order.amountOfCalendarsPurchased > 0) {
        for (let x = 0; x < fam[i].calendarEvents.length; x += 1) {
          l.push(fam[i].calendarEvents[x]);
        }
      }
    }
    return l;
  }

  function sortEvents(events: CalendarEventModel[]) {
    const newList: SortCalendarEventFromDate[] = [];
    events.forEach((event) => {
      const day = parseInt(event.date.slice(-2), 10);
      let month = 0;
      for (let i = 0; i < shortMonths.length; i += 1) {
        if (event.date.toLowerCase().substring(0, 3) === shortMonths[i]) {
          month = i;
          break;
        }
      }
      newList.push({ event, date: new Date(2020, month, day) });
    });
    newList.sort((a, b) => +new Date(a.date) - +new Date(b.date));
    return newList.map((o) => o.event);
  }

  function fetchEvents() {
    const empty: CalendarEventModel[] = [];
    const events = empty.concat(
      fetchFamilyCardEvents(),
      fetchBusinessCardEvents(),
      fetchClubCardEvents()
    );
    return sortEvents(events);
  }

  const [list] = useState<CalendarEventModel[]>(fetchEvents());

  return (
    <div className="card-container">
      <div className="card-options">
        <Button
          className="card-options-items"
          variant="primary"
          onClick={() => console.log('Export CSV')}
        >
          Export CSV
        </Button>
      </div>
      <Table className="card-table" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <tr key={`${item.name}${item.date}`}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.date}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
