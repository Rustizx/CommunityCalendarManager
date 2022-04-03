/* eslint-disable no-console */
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

import ImportExistingCalendarIcon from '../../icons/ImportFileIcon';
import CreateNewCalendarIcon from '../../icons/AddFileIcon';

function WelcomeScreen() {
  const navigate = useNavigate();

  async function clickOpenExisting() {
    const filePath: string =
      await window.electron.dialogs.openCalendarFileDialog();
    if (filePath !== '') {
      console.log(filePath);
      navigate('/enter-password');
    }
  }

  async function clickCreateNew() {
    const filePath: string =
      await window.electron.dialogs.createCalendarFileDialog();
    if (filePath !== '') {
      console.log(filePath);
      navigate('/make-password');
    }
  }

  return (
    <div className="welcome-body">
      <Row>
        <span className="welcome-title">Welcome!</span>
      </Row>
      <Row>
        <span className="welcome-subtitle">
          Please import an existing community calendar or create a new one.
        </span>
      </Row>
      <Row className="welcome-button-container">
        <div
          role="button"
          className="welcome-button"
          onClick={() => clickOpenExisting()}
          onKeyDown={() => clickOpenExisting()}
          tabIndex={-1}
        >
          <ImportExistingCalendarIcon
            className="welcome-button-icon welcome-button-icon-import"
            width={69}
            height={69}
          />
          <p className="welcome-button-text">Import Existing</p>
        </div>
        <div
          role="button"
          className="welcome-button"
          onClick={() => clickCreateNew()}
          onKeyDown={() => clickCreateNew()}
          tabIndex={-1}
        >
          <CreateNewCalendarIcon
            className="welcome-button-icon"
            width={69}
            height={69}
          />
          <p className="welcome-button-text">Create New</p>
        </div>
      </Row>
    </div>
  );
}

export default WelcomeScreen;
