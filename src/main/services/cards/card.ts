import CalendarModel, {
  CalendarEventModel,
  CardModel,
  ContactModel,
} from '../../models/calendar-model';

export function expandCard(current: CardModel, calendar: CalendarModel) {
  const calendarEventsList: CalendarEventModel[] = [];
  const contactsList: ContactModel[] = [];
  const defaultCalendarEvents: CalendarEventModel =
    calendar.defaultCard.calendarEvents[0];
  const defaultContact: ContactModel = calendar.defaultCard.contacts[0];
  for (let i = 0; i < 40; i += 1) {
    if (current.calendarEvents[i] !== undefined) {
      calendarEventsList.push(current.calendarEvents[i]);
    } else {
      calendarEventsList.push(defaultCalendarEvents);
    }
  }
  for (let i = 0; i < 3; i += 1) {
    if (current.contacts[i] !== undefined) {
      contactsList.push(current.contacts[i]);
    } else {
      contactsList.push(defaultContact);
    }
  }
  const newCard: CardModel = {
    id: current.id,
    name: current.name,
    contacts: contactsList,
    contactDetails: current.contactDetails,
    address: current.address,
    calendarEvents: calendarEventsList,
    order: current.order,
  };
  return newCard;
}

export function unexpandCard(current: CardModel) {
  const calendarEventsList: CalendarEventModel[] = [];
  const contactsList: ContactModel[] = [];
  for (let i = 0; i < current.calendarEvents.length; i += 1) {
    if (
      current.calendarEvents[i] !== undefined &&
      current.calendarEvents[i].name !== ''
    ) {
      calendarEventsList.push(current.calendarEvents[i]);
    }
  }
  for (let i = 0; i < current.contacts.length; i += 1) {
    if (
      current.contacts[i] !== undefined &&
      current.contacts[i].firstName !== ''
    ) {
      contactsList.push(current.contacts[i]);
    }
  }
  const newCard: CardModel = {
    id: current.id,
    name: current.name,
    contacts: contactsList,
    contactDetails: current.contactDetails,
    address: current.address,
    calendarEvents: calendarEventsList,
    order: current.order,
  };
  return newCard;
}
