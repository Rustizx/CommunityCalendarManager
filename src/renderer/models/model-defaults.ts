import {
  BusinessCardModel,
  ClubCardModel,
  FamilyCardModel,
} from './redux-models';

export const defaultFamily: FamilyCardModel = {
  id: '',
  family_name: '',
  contacts: [],
  contactDetails: {
    homePhone: '',
    workPhone: '',
    email: '',
  },
  address: {
    streetNumber: '',
    streetName: '',
    city: '',
    province: '',
    postalCode: '',
  },
  calendarEvents: [],
  order: {
    amountOfCalendarsPurchased: 0,
    amountDonated: 0,
    didDonated: false,
  },
};

export const defaultBusiness: BusinessCardModel = {
  id: '',
  business_name: '',
  contacts: [],
  contactDetails: {
    homePhone: '',
    workPhone: '',
    email: '',
  },
  address: {
    streetNumber: '',
    streetName: '',
    city: '',
    province: '',
    postalCode: '',
  },
  calendarEvents: [],
  order: {
    amountOfCalendarsPurchased: 0,
    amountDonated: 0,
    didDonated: false,
  },
};

export const defaultClub: ClubCardModel = {
  id: '',
  club_name: '',
  contacts: [],
  contactDetails: {
    homePhone: '',
    workPhone: '',
    email: '',
  },
  address: {
    streetNumber: '',
    streetName: '',
    city: '',
    province: '',
    postalCode: '',
  },
  calendarEvents: [],
  order: {
    amountOfCalendarsPurchased: 0,
    amountDonated: 0,
    didDonated: false,
  },
};
