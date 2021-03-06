export interface DateModel {
  month: string;
  day: string;
}
export interface CalendarEventModel {
  name: string;
  type: string;
  date: DateModel;
}

export interface ExportableCalendarEventModel {
  name: string;
  type: string;
  date: string;
}
export interface AddressModel {
  addressLine: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface ContactDetailModel {
  homePhone: string;
  workPhone: string;
  email: string;
}
export interface ContactModel {
  firstName: string;
  lastName: string;
}

export interface OrderModel {
  amountOfCalendarsPurchased: string;
  amountDonated: string;
  didDonated: boolean;
}

export interface CardModel {
  id: string;
  name: string;
  contacts: ContactModel[];
  contactDetails: ContactDetailModel;
  address: AddressModel;
  calendarEvents: CalendarEventModel[];
  order: OrderModel;
}

export default interface CalendarModel {
  name: string;
  dateCreated: string;
  dateModified: string;
  version: string;
  defaultCard: CardModel;
  familyCards: CardModel[];
  businessCards: CardModel[];
  clubCards: CardModel[];
}
