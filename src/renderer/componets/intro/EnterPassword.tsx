/* eslint-disable no-console */
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
// import { useNavigate } from 'react-router-dom';

import LockIcon from '../../icons/LockIcon';
import UnlockIcon from '../../icons/UnlockIcon';

function EnterPassword() {
  // const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');

  function openCalendar() {
    console.log(password);
  }

  return (
    <div className="password-body">
      <Row>
        <span className="password-subtitle">
          Please enter your calendar password.
        </span>
      </Row>
      <Form.Control
        className="password-text-box"
        type="password"
        name="password"
        placeholder="Enter password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Row className="password-button-container">
        <div
          role="button"
          className="password-button"
          onClick={() => openCalendar()}
          onKeyDown={() => openCalendar()}
          tabIndex={0}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          {visible ? (
            <UnlockIcon
              className="password-button-icon"
              width={28}
              height={32}
            />
          ) : (
            <LockIcon className="password-button-icon" width={28} height={32} />
          )}
          <p className="password-button-text">Open Calendar</p>
        </div>
      </Row>
    </div>
  );
}

export default EnterPassword;
