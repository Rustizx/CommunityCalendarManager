/* eslint-disable no-console */
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { ReadFileType } from 'main/ipc/types/file-manager-types';
import { setCalendar } from '../../store/calendar-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setGeneralError, setGeneralPassword } from '../../store/general-slice';
import LockIcon from '../../icons/LockIcon';
import UnlockIcon from '../../icons/UnlockIcon';

function EnterPassword() {
  const dispatch = useAppDispatch();
  const general = useAppSelector((state) => state.general);
  const calendar = useAppSelector((state) => state.calendar);
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');

  async function openCalendar() {
    setLoading(true);
    dispatch(setGeneralPassword(password));

    const fileInfo: ReadFileType = {
      path: general.path,
      password,
    };
    const fileContents = await window.electron.files.readCalendarFile(fileInfo);

    if (fileContents.status === 'success') {
      dispatch(setCalendar(fileContents.calendar ?? calendar));
      dispatch(setGeneralError(''));
      navigate('/dashboard');
    } else if (fileContents.status === 'password-error') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "The password you entered wasn't correct",
        allowOutsideClick: false,
        confirmButtonColor: 'rgba(72, 121, 254, 1)',
      });
    } else if (fileContents.status === 'file-error') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'The file you selected is not compatible',
        allowOutsideClick: false,
        confirmButtonColor: 'rgba(72, 121, 254, 1)',
      });
    }
    dispatch(setGeneralError(fileContents.status));
    setLoading(false);
  }

  const onKeyDownHandler = (e: { keyCode: number }) => {
    if (e.keyCode === 13) {
      openCalendar();
    }
  };

  return (
    <div className="entermake-body">
      <Row>
        <span className="entermake-subtitle">
          Please enter your calendar password.
        </span>
      </Row>
      <Form.Control
        className="entermake-text-box"
        type="password"
        name="password"
        placeholder="Enter password..."
        disabled={isLoading}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Row className="entermake-button-container">
        {isLoading ? (
          <div
            role="button"
            className="entermake-button-no-hover"
            tabIndex={-1}
          >
            <Spinner animation="border" variant="white" />
          </div>
        ) : (
          <div
            role="button"
            className="entermake-button"
            onClick={() => openCalendar()}
            onKeyDown={onKeyDownHandler}
            tabIndex={0}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {visible ? (
              <UnlockIcon
                className="entermake-button-icon"
                width={28}
                height={32}
              />
            ) : (
              <LockIcon
                className="entermake-button-icon"
                width={28}
                height={32}
              />
            )}
            <p className="entermake-button-text">Open Calendar</p>
          </div>
        )}
      </Row>
    </div>
  );
}

export default EnterPassword;
