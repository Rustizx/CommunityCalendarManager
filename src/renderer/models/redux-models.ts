export interface ImportCalendarModel {
  status: string;
  calendar?: CalendarModel;
}

export interface GeneralModel {
  isFileLoaded: boolean;
  path: string;
  password: string;
  error: string;
}

export interface CalendarEventModel {
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
  amountOfCalendarsPurchased: number;
  amountDonated: number;
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

export interface CalendarModel {
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
