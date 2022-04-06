import {
  BusinessCardModel,
  ClubCardModel,
  FamilyCardModel,
} from './redux-models';

export const demoFamilyCard: FamilyCardModel = {
  id: '82f22ds',
  family_name: 'Smiths',
  contacts: [
    {
      firstName: 'Will',
      lastName: 'Smith',
    },
  ],
  contactDetails: {
    homePhone: '123-456-789',
    workPhone: '',
    email: 'willsmith@gmail.com',
  },
  address: {
    addressLine: '964 Robson St',
    city: 'Vancouver',
    province: 'BC',
    postalCode: 'V6B3K9',
  },
  calendarEvents: [
    {
      name: 'Will Smith',
      type: 'B',
      date: 'February 02',
    },
    {
      name: 'Jada Smith',
      type: 'B',
      date: 'March 23',
    },
    {
      name: 'Jordan Smith',
      type: 'B',
      date: 'January 01',
    },
  ],
  order: {
    amountOfCalendarsPurchased: 1,
    amountDonated: 0,
    didDonated: false,
  },
};

export const defaultFamily: FamilyCardModel = {
  id: '',
  family_name: '',
  contacts: [
    {
      firstName: '',
      lastName: '',
    },
  ],
  contactDetails: {
    homePhone: '',
    workPhone: '',
    email: '',
  },
  address: {
    addressLine: '',
    city: '',
    province: '',
    postalCode: '',
  },
  calendarEvents: [
    {
      name: '',
      type: '',
      date: '',
    },
    {
      name: '',
      type: '',
      date: '',
    },
    {
      name: '',
      type: '',
      date: '',
    },
  ],
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
    addressLine: '',
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
    addressLine: '',
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
