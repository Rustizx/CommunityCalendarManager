import CalendarModel, {
  BusinessCardModel,
  CalendarEventModel,
  ContactModel,
} from '../../models/calendar-model';

export function expandBusinessCard(
  current: BusinessCardModel,
  calendar: CalendarModel
) {
  const calendarEventsList: CalendarEventModel[] = [];
  const contactsList: ContactModel[] = [];
  const defaultCalendarEvents: CalendarEventModel =
    calendar.defaultBusinessCard.calendarEvents[0];
  const defaultContact: ContactModel = calendar.defaultBusinessCard.contacts[0];
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
  const newCard: BusinessCardModel = {
    id: current.id,
    business_name: current.business_name,
    contacts: contactsList,
    contactDetails: current.contactDetails,
    address: current.address,
    calendarEvents: calendarEventsList,
    order: current.order,
  };
  return newCard;
}

export function unexpandBusinessCard(current: BusinessCardModel) {
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
  const newCard: BusinessCardModel = {
    id: current.id,
    business_name: current.business_name,
    contacts: contactsList,
    contactDetails: current.contactDetails,
    address: current.address,
    calendarEvents: calendarEventsList,
    order: current.order,
  };
  return newCard;
}