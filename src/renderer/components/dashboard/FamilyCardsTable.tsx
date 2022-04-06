/* eslint-disable no-console */
import { ChangeEventHandler, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Fuse from 'fuse.js';
import { Formik } from 'formik';
import * as yup from 'yup';

import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import { defaultFamily } from '../../models/model-defaults';
import { useAppSelector } from '../../hooks/redux-hooks';
import { FamilyCardModel } from '../../models/redux-models';

const provinces = [
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'ON', label: 'Ontario' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'YT', label: 'Yukon' },
];

const options = [
  { value: 'A', label: 'Anniversary' },
  { value: 'B', label: 'Birthday' },
  { value: 'M', label: 'Memoriam' },
];

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
    email: yup.string().email(),
  }),
  address: yup.object().shape({
    addressLine: yup.string().required(),
    streetName: yup.string().required(),
    city: yup.string().required(),
    province: yup.string().required(),
    postalCode: yup.string().required(),
  }),
  calendarEvents: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      type: yup.string().required(),
      date: yup.string().required(),
    })
  ),
  order: yup.object().shape({
    amountOfCalendarsPurchased: yup.number().required(),
    amountDonated: yup.number(),
    didDonated: yup.boolean(),
  }),
});

export default function FamilyCardsTable() {
  const calendar = useAppSelector((state) => state.calendar);
  let sortedFamilyCards = calendar.familyCards.sort((a, b) =>
    a.family_name.toLowerCase().localeCompare(b.family_name.toLowerCase())
  );

  const [searchBox, setSearchBox] = useState('');
  const [results, setResults] = useState<FamilyCardModel[]>(sortedFamilyCards);
  const [selectedFamily, setSelectedFamily] = useState<FamilyCardModel>(
    calendar.defaultFamilyCard
  );

  const fuse = new Fuse(sortedFamilyCards, {
    shouldSort: true,
    findAllMatches: true,
    keys: ['family_name', 'contacts[0].firstName', 'contacts[0].lastName'],
  });

  function updateTable() {
    sortedFamilyCards = calendar.familyCards.sort((a, b) =>
      a.family_name.toLowerCase().localeCompare(b.family_name.toLowerCase())
    );
  }

  const [editFamily, setEditFamily] = useState(false);

  function handleOpenAddFamily() {
    setSelectedFamily(defaultFamily);
    setEditFamily(true);
  }

  function handleOpenEditFamily(id: string) {
    const findFamily = calendar.familyCards.find((x) => {
      return x.id === id;
    });
    if (findFamily !== undefined) {
      setSelectedFamily(findFamily);
      setEditFamily(true);
    }
  }

  function handleCloseEditFamily() {
    setEditFamily(false);
    updateTable();
  }

  function searchTable(value: string) {
    setSearchBox(value);
    if (value === '') {
      setResults(sortedFamilyCards);
    } else {
      const re = fuse.search(value);
      const characterResults = re.map((character) => character.item);
      setResults(characterResults);
    }
  }

  const [count, setCount] = useState(3);

  const handleAddRow = () => {
    if (count < 40) {
      const temp = selectedFamily.calendarEvents;
      temp.push({
        name: '',
        type: '',
        date: '',
      });
      setSelectedFamily({
        ...selectedFamily,
        calendarEvents: temp,
      });
      setCount(count + 1);
    } else {
      setCount(40);
    }
  };

  const handleRemoveRow = () => {
    if (count > 0) {
      setSelectedFamily({
        ...selectedFamily,
        calendarEvents: [],
      });
      setCount(count - 1);
    } else {
      setCount(0);
    }
  };

  function ChangeFamily(values: FamilyCardModel) {
    console.log(values);
  }

  const dateTable = (
    values: FamilyCardModel,
    handleChange:
      | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
      | undefined,
    setFieldValue: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (field: string, value: any, shouldValidate?: boolean | undefined): void;
      (arg0: string, arg1: string): void;
    }
  ) => {
    const table = [];
    for (let i = 0; i < count; i += 1) {
      table.push(
        <Row key={`table${i}`}>
          <Form.Group as={Col} md="5">
            {i === 0 && <Form.Label>Name</Form.Label>}
            <Form.Control
              type="text"
              name={`calendarEvents[${i}].name`}
              placeholder="Name"
              value={values.calendarEvents[i].name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            {i === 0 && <Form.Label>Date</Form.Label>}
            <Form.Control
              type="date"
              max="2020-12-31"
              min="2020-01-01"
              placeholder="Enter Date"
              name={`calendarEvents[${i}].date`}
              value={values.calendarEvents[i].date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            {i === 0 && <Form.Label>Type</Form.Label>}
            <Form.Control
              as="select"
              name={`calendarEvents[${i}].type`}
              value={values.calendarEvents[i].type}
              onChange={handleChange}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} md="1">
            {i === 0 && <Form.Label>Clear</Form.Label>}
            <Button
              variant="outline-dark"
              style={{ height: '30px', fontSize: '12px' }}
              onClick={() => {
                setFieldValue(`calendarEvents[${i}].name`, '');
                setFieldValue(`calendarEvents[${i}].type`, 'B');
                setFieldValue(`calendarEvents[${i}].date`, '');
              }}
            >
              Clear
            </Button>
          </Form.Group>
        </Row>
      );
    }

    return table;
  };

  return (
    <>
      <div className="card-container">
        <div className="card-options">
          <Button
            className="card-options-items"
            variant="primary"
            onClick={() => handleOpenAddFamily()}
          >
            Add New
          </Button>
          <Button
            className="card-options-items"
            variant="primary"
            onClick={() => console.log('RETURN PDF')}
          >
            Get Cards PDF
          </Button>
          <Form.Control
            className="card-options-items"
            style={{ width: '275px' }}
            type="text"
            placeholder="Search"
            value={searchBox}
            onChange={(e) => searchTable(e.target.value)}
          />
        </div>
        <Table className="card-table" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Family Name</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Entries</th>
              <th>Orders</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((family) => {
              return (
                <tr key={family.id}>
                  <td>{family.family_name}</td>
                  <td>{`${family.contacts[0].firstName} ${family.contacts[0].lastName}`}</td>
                  <td>
                    {family.contactDetails.homePhone.replace(
                      /(\d{3})(\d{3})(\d{4})/,
                      '$1-$2-$3'
                    )}
                  </td>
                  <td>{`${family.address.addressLine}, ${family.address.city}, ${family.address.province}`}</td>
                  <td>{`${family.calendarEvents.length}`}</td>
                  <td>{`${family.order.amountOfCalendarsPurchased}`}</td>
                  <td>
                    <Button
                      id="dropdown-split-variants-primary"
                      onClick={() => handleOpenEditFamily(family.id)}
                      variant="primary"
                      style={{ height: '35px' }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Modal
        show={editFamily}
        onHide={() => handleCloseEditFamily()}
        fullscreen
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedFamily.family_name !== ''
              ? `Editing the ${selectedFamily.family_name} Family`
              : `Adding a New Family`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => console.log(values)}
            initialValues={selectedFamily}
          >
            {({
              setFieldValue,
              handleSubmit,
              handleChange,
              handleReset,
              dirty,
              values,
              errors,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Form.Group as={Col} md="2" controlId="validationFormik01">
                    <Form.Label>Family Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="family_name"
                      placeholder="Family Name"
                      value={values.family_name}
                      onChange={handleChange}
                      isInvalid={!!errors.family_name}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationFormik02">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="contacts[0].firstName"
                      placeholder="First Name"
                      value={values.contacts[0].firstName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationFormik02">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="contacts[0].lastName"
                      placeholder="Last Name"
                      value={
                        values.contacts[0].lastName === ''
                          ? values.family_name
                          : values.contacts[0].lastName
                      }
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationFormik03">
                    <Form.Label>Home Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Phone Number"
                      name="contactDetails.homePhone"
                      value={values.contactDetails.homePhone}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationFormik03">
                    <Form.Label>Work Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Phone Number"
                      name="contactDetails.workPhone"
                      value={values.contactDetails.workPhone}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationFormik04">
                    <Form.Label>Calendars Ordered</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      name="order.amountOfCalendarsPurchased"
                      value={values.order.amountOfCalendarsPurchased}
                      onChange={handleChange}
                      isInvalid={!!values.order.amountOfCalendarsPurchased}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="5" controlId="validationFormik05">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      name="address.addressLine"
                      value={values.address.addressLine}
                      onChange={handleChange}
                      isInvalid={!!errors.address}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationFormik06">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      name="address.city"
                      value={values.address.city}
                      onChange={handleChange}
                      isInvalid={!!errors.address?.city}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationFormik07">
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                      as="select"
                      name="address.province"
                      value={values.address.province}
                      onChange={handleChange}
                    >
                      {provinces.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="validationFormik07">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Postal Code"
                      name="address.postalCode"
                      value={values.address.postalCode}
                      onChange={handleChange}
                      isInvalid={!!errors.address?.postalCode}
                    />
                  </Form.Group>
                </Row>
                <Row />
                <p>Calendar Dates</p>
                <Card style={{ top: '-6px' }}>
                  <Card.Body>
                    {dateTable(values, handleChange, setFieldValue)}
                  </Card.Body>
                </Card>
                <div
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <ButtonGroup
                    aria-label="Basic example"
                    style={{ height: '30px' }}
                  >
                    <Button
                      variant="outline-dark"
                      style={{ height: '30px', fontSize: '12px' }}
                      onClick={handleAddRow}
                    >
                      +
                    </Button>
                    <Button
                      variant="outline-dark"
                      style={{ height: '30px', fontSize: '12px' }}
                      onClick={handleRemoveRow}
                    >
                      -
                    </Button>
                  </ButtonGroup>
                </div>
                <Row style={{ marginTop: '20px' }}>
                  <Col md="2">
                    <Button
                      type="submit"
                      onClick={() => ChangeFamily(values)}
                      style={{ width: '100%' }}
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col md="1">
                    <Button
                      type="button"
                      variant="outline-secondary"
                      onClick={handleReset}
                      disabled={!dirty || isSubmitting}
                      style={{ width: '100%' }}
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}
