/* eslint-disable no-console */
import { CalendarEventModel } from 'main/models/calendar-model';
import generateUniqSerial from 'main/services/generate-uuid';
import sortEvents from 'main/services/sort-calendar-events';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { useAppSelector } from '../../redux/hooks/redux-hooks';

export default function ListTable() {
  const calendar = useAppSelector((state) => state.calendar);

  function fetchFamilyCardEvents() {
    const l: CalendarEventModel[] = [];
    const fam = calendar.familyCards;
    for (let i = 0; i < fam.length; i += 1) {
      if (parseInt(fam[i].order.amountOfCalendarsPurchased, 10) > 0) {
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
      for (let x = 0; x < fam[i].calendarEvents.length; x += 1) {
        l.push(fam[i].calendarEvents[x]);
      }
    }
    return l;
  }

  // function fetchClubCardEvents() {
  //   const l: CalendarEventModel[] = [];
  //   const fam = calendar.clubCards;
  //   for (let i = 0; i < fam.length; i += 1) {
  //     if (parseInt(fam[i].order.amountOfCalendarsPurchased, 10) > 0) {
  //       for (let x = 0; x < fam[i].calendarEvents.length; x += 1) {
  //         l.push(fam[i].calendarEvents[x]);
  //       }
  //     }
  //   }
  //   return l;
  // }

  function fetchEvents() {
    const empty: CalendarEventModel[] = [];
    const events = empty.concat(
      fetchFamilyCardEvents(),
      fetchBusinessCardEvents()
      // fetchClubCardEvents()
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
              <tr key={generateUniqSerial()}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{`${item.date.month}  ${item.date.day}`}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
