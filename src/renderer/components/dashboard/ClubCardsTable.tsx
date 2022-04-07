/* eslint-disable no-console */
// To any future developer looking at this code, I'm truely sorry about how unreadable this is. It's 2am and I got lazy :)
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
import { WriteCalendarModel } from '../../models/add-models';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import {
  CalendarEventModel,
  ContactModel,
  ClubCardModel,
} from '../../models/redux-models';
import { addCard, setDefaultClub } from '../../store/calendar-slice';
import { months, options, provinces } from '../../common/constants';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const schema = yup.object().shape({
  club_name: yup.string().required(),
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

function generateUniqSerial(): string {
  return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, () => {
    const r = Math.floor(Math.random() * 16);
    return r.toString(16);
  });
}

export default function ClubCardsTable() {
  const calendar = useAppSelector((state) => state.calendar);
  const general = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();

  const [searchBox, setSearchBox] = useState('');
  const [results, setResults] = useState<ClubCardModel[]>(calendar.clubCards);
  const [selectedClub, setSelectedClub] = useState<ClubCardModel>(
    calendar.defaultClubCard
  );

  let fuse = new Fuse(calendar.clubCards, {
    shouldSort: true,
    findAllMatches: true,
    keys: ['club_name', 'contacts[0].firstName', 'contacts[0].lastName'],
  });

  const [editClub, setEditClub] = useState(false);

  function expandClubCard(current: ClubCardModel) {
    const calendarEventsList: CalendarEventModel[] = [];
    const contactsList: ContactModel[] = [];
    const defaultCalendarEvents: CalendarEventModel =
      calendar.defaultClubCard.calendarEvents[0];
    const defaultContact: ContactModel = calendar.defaultClubCard.contacts[0];
    for (let i = 0; i < 40; i += 1) {
      if (current.calendarEvents[i] !== undefined) {
        calendarEventsList.push(current.calendarEvents[i]);
      } else {
        calendarEventsList.push(defaultCalendarEvents);
      }
    }
    for (let i = 0; i < 3; i += 1) {
      if (current.contacts[i] !== undefined) {
        contactsList.push(current.contacts[i]);
      } else {
        contactsList.push(defaultContact);
      }
    }
    const newCard: ClubCardModel = {
      id: current.id,
      club_name: current.club_name,
      contacts: contactsList,
      contactDetails: current.contactDetails,
      address: current.address,
      calendarEvents: calendarEventsList,
      order: current.order,
    };
    return newCard;
  }

  function unexpandClubCard(current: ClubCardModel) {
    const calendarEventsList: CalendarEventModel[] = [];
    const contactsList: ContactModel[] = [];
    for (let i = 0; i < current.calendarEvents.length; i += 1) {
      if (
        current.calendarEvents[i] !== undefined &&
        current.calendarEvents[i].name !== ''
      ) {
        calendarEventsList.push(current.calendarEvents[i]);
      }
    }
    for (let i = 0; i < current.contacts.length; i += 1) {
      if (
        current.contacts[i] !== undefined &&
        current.contacts[i].firstName !== ''
      ) {
        contactsList.push(current.contacts[i]);
      }
    }
    const newCard: ClubCardModel = {
      id: current.id,
      club_name: current.club_name,
      contacts: contactsList,
      contactDetails: current.contactDetails,
      address: current.address,
      calendarEvents: calendarEventsList,
      order: current.order,
    };
    return newCard;
  }

  function handleOpenAddClub() {
    setSelectedClub(expandClubCard(calendar.defaultClubCard));
    setEditClub(true);
  }

  function handleOpenEditClub(id: string) {
    const findClub = calendar.clubCards.find((x) => {
      return x.id === id;
    });
    if (findClub !== undefined) {
      setSelectedClub(expandClubCard(findClub));
      setEditClub(true);
    }
  }

  function searchTable(value: string) {
    setSearchBox(value);
    if (value === '') {
      setResults(calendar.clubCards);
      fuse = new Fuse(calendar.clubCards, {
        shouldSort: true,
        findAllMatches: true,
        keys: ['club_name', 'contacts[0].firstName', 'contacts[0].lastName'],
      });
    } else {
      const re = fuse.search(value);
      const characterResults = re.map((character) => character.item);
      setResults(characterResults);
    }
  }

  async function updateTable() {
    await sleep(1000);
    searchTable('');
  }

  function handleCloseEditClub() {
    setEditClub(false);
    updateTable();
  }

  function handleChangeClub(values: ClubCardModel) {
    const cleanedClubCard = unexpandClubCard(values);
    for (let l = 0; l < cleanedClubCard.contacts.length; l += 1) {
      if (cleanedClubCard.contacts[l].lastName === '') {
        cleanedClubCard.contacts[l].lastName = cleanedClubCard.club_name;
      }
    }
    if (cleanedClubCard.id === '') {
      cleanedClubCard.id = generateUniqSerial();
    }
    if (cleanedClubCard.address.province === '') {
      cleanedClubCard.address.province = provinces[0].value;
    }
    if (parseInt(cleanedClubCard.order.amountDonated, 10) > 0) {
      cleanedClubCard.order.didDonated = true;
    }
    const addClub = calendar.clubCards.filter((x) => {
      return x.id !== cleanedClubCard.id;
    });
    addClub.push(cleanedClubCard);

    const tempCalendar = {
      ...calendar,
      clubCards: addClub,
    };

    const calendarWrite: WriteCalendarModel = {
      calendar: tempCalendar,
      path: general.path,
      password: general.password,
    };
    dispatch(addCard(calendarWrite));
    handleCloseEditClub();
  }

  const [count, setCount] = useState(3);

  const handleAddRow = () => {
    if (count < 40) {
      setCount(count + 1);
    } else {
      setCount(40);
    }
  };

  const handleRemoveRow = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  };

  function handleDelete(famID: string) {
    const newFamilies = calendar.clubCards.filter((x) => {
      return x.id !== famID;
    });

    const tempCalendar = {
      ...calendar,
      clubCards: newFamilies,
    };

    const calendarWrite: WriteCalendarModel = {
      calendar: tempCalendar,
      path: general.path,
      password: general.password,
    };
    dispatch(addCard(calendarWrite));
    handleCloseEditClub();
  }

  function handleSetDefault(fam: ClubCardModel) {
    dispatch(setDefaultClub(fam));
  }

  async function clickSavePDF() {
    const filePath: string =
      await window.electron.dialogs.createPDFFileDialog();
    if (filePath !== '') {
      const result: string = await window.electron.files.writeClubCardPDF({
        path: filePath,
        password: '',
        calendar,
      });
      console.log(result);
    }
  }

  const dateTable = (
    values: ClubCardModel,
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
          <Form.Group as={Col} md="2">
            {i === 0 && <Form.Label>Date</Form.Label>}
            <Form.Control
              as="select"
              name={`calendarEvents[${i}].date.month`}
              value={values.calendarEvents[i].date.month}
              onChange={handleChange}
            >
              {months.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} md="1">
            {i === 0 && <Form.Label>.</Form.Label>}
            <Form.Control
              type="text"
              name={`calendarEvents[${i}].date.day`}
              placeholder="Day"
              value={values.calendarEvents[i].date.day}
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
            onClick={() => handleOpenAddClub()}
          >
            Add New
          </Button>
          <Button
            className="card-options-items"
            variant="primary"
            onClick={() => clickSavePDF()}
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
              <th>Club Name</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Entries</th>
              <th>Orders</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((Club) => {
              return (
                <tr key={Club.id}>
                  <td>{Club.club_name}</td>
                  <td>{`${Club.contacts[0].firstName} ${Club.contacts[0].lastName}`}</td>
                  <td>
                    {Club.contactDetails.homePhone.replace(
                      /(\d{3})(\d{3})(\d{4})/,
                      '$1-$2-$3'
                    )}
                  </td>
                  <td>{`${Club.address.addressLine}, ${Club.address.city}, ${Club.address.province}`}</td>
                  <td>{`${Club.calendarEvents.length}`}</td>
                  <td>{`${Club.order.amountOfCalendarsPurchased}`}</td>
                  <td>
                    <Button
                      id="dropdown-split-variants-primary"
                      onClick={() => handleOpenEditClub(Club.id)}
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
        show={editClub}
        onHide={() => handleCloseEditClub()}
        fullscreen
        dialogClassName="card-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="card-title">
            {selectedClub.club_name !== ''
              ? `Editing the ${selectedClub.club_name} Club`
              : `Adding a New Club`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => console.log(values)}
            initialValues={selectedClub}
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
                <div className="form-box">
                  <div className="form-title-box analytics-blue">
                    <span className="form-box-title">General</span>
                  </div>
                  <div className="form-box-container">
                    <Form.Group
                      as={Col}
                      className="form-component"
                      controlId="validationFormik01"
                    >
                      <Form.Label className="form-text">Club Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="club_name"
                        placeholder="Club Name"
                        value={values.club_name}
                        onChange={handleChange}
                        isInvalid={!!errors.club_name}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      className="form-component"
                      md="2"
                      controlId="validationFormik02"
                    >
                      <Form.Label className="form-text">
                        Calendars Ordered
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="order.amountOfCalendarsPurchased"
                        placeholder="# of Calendars"
                        value={values.order.amountOfCalendarsPurchased}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      className="form-component"
                      as={Col}
                      md="2"
                      controlId="validationFormik02"
                    >
                      <Form.Label className="form-text">Donation</Form.Label>
                      <Form.Control
                        type="text"
                        name="order.amountDonated"
                        placeholder="$0.00"
                        value={values.order.amountDonated}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="form-box">
                  <div className="form-title-box analytics-green">
                    <span className="form-box-title">Contact Name</span>
                  </div>
                  <div className="form-box-container-name">
                    <div className="form-name-container">
                      <span className="form-contact-text">Primary</span>
                      <Form.Group
                        as={Col}
                        className="form-component"
                        controlId="validationFormik02"
                      >
                        <Form.Label className="form-text">
                          First Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="contacts[0].firstName"
                          placeholder="First Name"
                          value={values.contacts[0].firstName}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        className="form-component"
                        controlId="validationFormik02"
                      >
                        <Form.Label className="form-text">Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="contacts[0].lastName"
                          placeholder="Last Name"
                          value={
                            values.contacts[0].lastName === ''
                              ? values.club_name
                              : values.contacts[0].lastName
                          }
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="form-name-container">
                      <span className="form-contact-text">Optional</span>
                      <Form.Group
                        as={Col}
                        className="form-component"
                        controlId="validationFormik02"
                      >
                        <Form.Label className="form-text">
                          First Name (optional)
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="contacts[1].firstName"
                          placeholder="First Name"
                          value={values.contacts[1].firstName}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        className="form-component"
                        controlId="validationFormik02"
                      >
                        <Form.Label className="form-text">
                          Last Name (optional)
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="contacts[1].lastName"
                          placeholder="Last Name"
                          value={
                            values.contacts[1].lastName === ''
                              ? values.club_name
                              : values.contacts[1].lastName
                          }
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                  </div>
                </div>
                <div className="form-box">
                  <div className="form-title-box analytics-purple">
                    <span className="form-box-title">Contact Details</span>
                  </div>
                  <div className="form-box-container">
                    <Form.Group
                      as={Col}
                      className="form-component"
                      controlId="validationFormik03"
                    >
                      <Form.Label className="form-text">Home Phone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Phone Number"
                        name="contactDetails.homePhone"
                        value={values.contactDetails.homePhone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      className="form-component"
                      controlId="validationFormik03"
                    >
                      <Form.Label className="form-text">Work Phone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Phone Number"
                        name="contactDetails.workPhone"
                        value={values.contactDetails.workPhone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      className="form-component"
                      controlId="validationFormik04"
                    >
                      <Form.Label className="form-text">Email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Email"
                        name="contactDetails.email"
                        value={values.contactDetails.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="form-box">
                  <div className="form-title-box analytics-orange">
                    <span className="form-box-title">Address</span>
                  </div>
                  <div className="form-box-container">
                    <Form.Group
                      as={Col}
                      className="form-component"
                      controlId="validationFormik05"
                    >
                      <Form.Label className="form-text">Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        name="address.addressLine"
                        value={values.address.addressLine}
                        onChange={handleChange}
                        isInvalid={!!errors.address?.addressLine}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="2"
                      className="form-component"
                      controlId="validationFormik06"
                    >
                      <Form.Label className="form-text">City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="City"
                        name="address.city"
                        value={values.address.city}
                        onChange={handleChange}
                        isInvalid={!!errors.address?.city}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      className="form-component"
                      md="1"
                      controlId="validationFormik07"
                    >
                      <Form.Label className="form-text">Province</Form.Label>
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
                    <Form.Group
                      as={Col}
                      className="form-component"
                      md="2"
                      controlId="validationFormik07"
                    >
                      <Form.Label className="form-text">Postal Code</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Postal Code"
                        name="address.postalCode"
                        value={values.address.postalCode}
                        onChange={handleChange}
                        isInvalid={!!errors.address?.postalCode}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="form-box">
                  <div className="form-title-box analytics-blue">
                    <span className="form-box-title">Calendar Dates</span>
                  </div>
                  <div className="form-box-container-table">
                    <div className="form-card-table">
                      {dateTable(values, handleChange, setFieldValue)}
                    </div>
                    <div className="form-card-table-button">
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
                  </div>
                </div>
                <Row />
                <Row style={{ marginTop: '20px' }}>
                  <Col md="2">
                    <Button
                      type="submit"
                      onClick={() => handleChangeClub(values)}
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
                  {selectedClub.id === '' && (
                    <Col md="1">
                      <Button
                        type="button"
                        variant="outline-info"
                        onClick={() => handleSetDefault(selectedClub)}
                        style={{ width: '100%' }}
                      >
                        Set Default
                      </Button>
                    </Col>
                  )}
                  <Col md="1">
                    <Button
                      type="button"
                      variant="outline-danger"
                      onClick={() => handleDelete(selectedClub.id)}
                      style={{ width: '100%' }}
                    >
                      Delete
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
