import { CardModel } from '../models/calendar-model';

const EmptyCard: CardModel = {
  id: '',
  name: '',
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

export default EmptyCard;
