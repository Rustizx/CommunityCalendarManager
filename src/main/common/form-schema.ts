import * as yup from 'yup';

const schema = yup.object().shape({
  family_name: yup.string().required(),
  contacts: yup.array().of(
    yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
    })
  ),
  contactDetails: yup.object().shape({
    homePhone: yup.string(),
    workPhone: yup.string(),
    email: yup.string(),
  }),
  address: yup.object().shape({
    addressLine: yup.string().required(),
    streetName: yup.string().required(),
    city: yup.string().required(),
    province: yup.string().required(),
    postalCode: yup.string().required(),
  }),
  order: yup.object().shape({
    amountOfCalendarsPurchased: yup.string().required(),
    amountDonated: yup.string(),
    didDonated: yup.boolean(),
  }),
});

export default schema;
