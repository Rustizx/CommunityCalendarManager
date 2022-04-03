/* eslint-disable no-console */
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
// import { useNavigate } from 'react-router-dom';

import AddIcon from 'renderer/icons/AddIcon';

function MakePassword() {
  // const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  function openCalendar() {
    setLoading(true);
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
        disabled={isLoading}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Form.Control
        className="password-text-box"
        type="password"
        name="password"
        placeholder="Re-enter password..."
        value={verifyPassword}
        disabled={isLoading}
        onChange={(e) => setVerifyPassword(e.target.value)}
      />
      <Row className="password-button-container">
        {isLoading ? (
          <div role="button" className="password-button-no-hover" tabIndex={-1}>
            <Spinner animation="border" variant="white" />
          </div>
        ) : (
          <div
            role="button"
            className="password-button"
            onClick={() => openCalendar()}
            onKeyDown={() => openCalendar()}
            tabIndex={-1}
          >
            <AddIcon className="password-button-icon" width={28} height={32} />
            <p className="password-button-text">Create Calendar</p>
          </div>
        )}
      </Row>
    </div>
  );
}

export default MakePassword;
