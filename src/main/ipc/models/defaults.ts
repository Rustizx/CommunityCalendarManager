import {
  BusinessCardModel,
  ClubCardModel,
  FamilyCardModel,
} from 'renderer/models/redux-models';

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
      type: 'B',
      date: {
        month: '',
        day: '',
      },
    },
  ],
  order: {
    amountOfCalendarsPurchased: '',
    amountDonated: '',
    didDonated: false,
  },
};

export const defaultBusiness: BusinessCardModel = {
  id: '',
  business_name: '',
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
      type: 'B',
      date: {
        month: '',
        day: '',
      },
    },
  ],
  order: {
    amountOfCalendarsPurchased: '',
    amountDonated: '',
    didDonated: false,
  },
};

export const defaultClub: ClubCardModel = {
  id: '',
  club_name: '',
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
      type: 'B',
      date: {
        month: '',
        day: '',
      },
    },
  ],
  order: {
    amountOfCalendarsPurchased: '',
    amountDonated: '',
    didDonated: false,
  },
};
