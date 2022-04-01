/* eslint-disable no-console */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Footer from '../componets/Footer';

import importExistingCalendarIcon from '../../../assets/images/screens/welcome/import_existing_calendar.svg';
import createNewCalendarIcon from '../../../assets/images/screens/welcome/create_new_calendar.svg';

function clickOpenExisting() {
  console.log('Open Existing Calendar');
}

function clickCreateNew() {
  console.log('Create New Calendar');
}

function WelcomeScreen() {
  return (
    <div className="welcome-background">
      <Container fluid>
        <Row />
        <Row className="welcome-body">
          <Row>
            <h1 className="welcome-title">Community Calendar Manager</h1>
            <h4 className="welcome-subtitle">
              Welcome! Please import an existing community calendar or create a
              new one.
            </h4>
          </Row>
          <Row className="welcome-button-container">
            <div
              role="button"
              className="welcome-button"
              onClick={() => clickOpenExisting()}
              onKeyDown={() => clickOpenExisting()}
              tabIndex={0}
            >
              <div className="welcome-import-button-icon">
                <img
                  className="welcome-button-image"
                  src={importExistingCalendarIcon}
                  alt="import existing calendar icon"
                />
              </div>
              <p className="welcome-button-text">Import Existing Calendar</p>
            </div>
            <div
              role="button"
              className="welcome-button"
              onClick={() => clickCreateNew()}
              onKeyDown={() => clickCreateNew()}
              tabIndex={0}
            >
              <div className="welcome-create-button-icon">
                <img
                  className="welcome-button-image"
                  src={createNewCalendarIcon}
                  alt="create new calendar icon"
                />
              </div>
              <p className="welcome-button-text">Create New Calendar</p>
            </div>
          </Row>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default WelcomeScreen;
