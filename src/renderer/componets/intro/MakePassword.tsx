/* eslint-disable no-console */
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
// import { useNavigate } from 'react-router-dom';

import AddIcon from 'renderer/icons/AddIcon';

function MakePassword() {
  // const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

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
      <Form.Control
        className="password-text-box"
        type="password"
        name="password"
        placeholder="Re-enter password..."
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
      />
      <Row className="password-button-container">
        <div
          role="button"
          className="password-button"
          onClick={() => openCalendar()}
          onKeyDown={() => openCalendar()}
          tabIndex={0}
        >
          <AddIcon className="password-button-icon" width={28} height={32} />
          <p className="password-button-text">Create Calendar</p>
        </div>
      </Row>
    </div>
  );
}

export default MakePassword;
