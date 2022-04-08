export interface DateModel {
  month: string;
  day: string;
}
export interface CalendarEventModel {
  name: string;
  type: string;
  date: DateModel;
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

export interface FamilyCardModel {
  id: string;
  family_name: string;
  contacts: ContactModel[];
  contactDetails: ContactDetailModel;
  address: AddressModel;
  calendarEvents: CalendarEventModel[];
  order: OrderModel;
}

export interface BusinessCardModel {
  id: string;
  business_name: string;
  contacts: ContactModel[];
  contactDetails: ContactDetailModel;
  address: AddressModel;
  calendarEvents: CalendarEventModel[];
  order: OrderModel;
}

export interface ClubCardModel {
  id: string;
  club_name: string;
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
  defaultFamilyCard: FamilyCardModel;
  familyCards: FamilyCardModel[];
  defaultBusinessCard: BusinessCardModel;
  businessCards: BusinessCardModel[];
  defaultClubCard: ClubCardModel;
  clubCards: ClubCardModel[];
}
