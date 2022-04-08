import { ChangeEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Fuse from 'fuse.js';
import { Formik } from 'formik';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import {
  expandClubCard,
  unexpandClubCard,
} from 'main/services/cards/club-cards';
import { ClubCardModel } from 'main/models/calendar-model';
import {
  calendarEventMonths,
  calendarEventOptions,
  provinces,
} from 'main/common/constants';
import { WriteCalendarFileModel } from 'main/models/ipc-models';
import schema from 'main/common/form-schema';

import routePaths from 'main/common/route-paths';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux-hooks';
import { addCard, setDefaultClub } from '../../redux/store/calendar-slice';

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
  const navigate = useNavigate();

  const [searchBox, setSearchBox] = useState('');
  const [results, setResults] = useState<ClubCardModel[]>(calendar.clubCards);

  const [selectedClub, setSelectedClub] = useState<ClubCardModel>(
    calendar.defaultClubCard
  );

  const fuse = new Fuse(calendar.clubCards, {
    shouldSort: true,
    findAllMatches: true,
    keys: ['club_name', 'contacts[0].firstName', 'contacts[0].lastName'],
  });

  const [editClub, setEditClub] = useState(false);

  function handleOpenAddClub() {
    setSelectedClub(expandClubCard(calendar.defaultClubCard, calendar));
    setEditClub(true);
  }

  function handleOpenEditClub(id: string) {
    const findClub = calendar.clubCards.find((x) => {
      return x.id === id;
    });
    if (findClub !== undefined) {
      setSelectedClub(expandClubCard(findClub, calendar));
      setEditClub(true);
    }
  }

  function searchTable(value: string) {
    setSearchBox(value);
    if (value === '') {
      setResults(calendar.clubCards);
    } else {
      const re = fuse.search(value);
      const characterResults = re.map((character) => character.item);
      setResults(characterResults);
    }
  }

  async function updateTable() {
    navigate(routePaths.clubCards);
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

    const calendarWrite: WriteCalendarFileModel = {
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

    const calendarWrite: WriteCalendarFileModel = {
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
      await window.electron.files.writeClubCardPDF({
        path: filePath,
        password: '',
        calendar,
      });
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
              {calendarEventMonths.map((option) => (
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
              {calendarEventOptions.map((option) => (
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
            // eslint-disable-next-line no-console
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
                  <div className="form-title-box home-blue">
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
                  <div className="form-title-box home-green">
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
                  <div className="form-title-box home-purple">
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
                  <div className="form-title-box home-orange">
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
                  <div className="form-title-box home-blue">
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
