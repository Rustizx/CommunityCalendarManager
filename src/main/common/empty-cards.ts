import {
  BusinessCardModel,
  ClubCardModel,
  FamilyCardModel,
} from '../models/calendar-model';

export const EmptyFamilyCard: FamilyCardModel = {
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

export const EmptyBusinessCard: BusinessCardModel = {
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

export const EmptyClubCard: ClubCardModel = {
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
