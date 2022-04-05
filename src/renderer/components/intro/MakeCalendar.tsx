/* eslint-disable no-await-in-loop */
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { WriteFileType } from 'main/ipc/types/file-manager-types';
import {
  defaultBusiness,
  defaultClub,
  defaultFamily,
} from '../../models/model-defaults';
import { setGeneralError, setGeneralPassword } from '../../store/general-slice';
import { setCalendar } from '../../store/calendar-slice';
import { CalendarModel } from '../../models/redux-models';
import { fileVersion } from '../../common/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import AddIcon from '../../icons/AddIcon';

const MySwal = withReactContent(Swal);

function MakePassword() {
  const dispatch = useAppDispatch();
  const general = useAppSelector((state) => state.general);
  const calendar = useAppSelector((state) => state.calendar);
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  let password = '';
  let isPasswordVerified = false;

  async function createCalendar() {
    setLoading(true);
    if (title !== '') {
      do {
        const { value: pass } = await MySwal.fire({
          title: 'Enter a password for your calender.',
          input: 'password',
          inputPlaceholder: 'Enter your password',
          inputAttributes: {
            autocapitalize: 'off',
            autocorrect: 'off',
          },
        });
        const { value: verifyPass } = await MySwal.fire({
          title: 'Re-enter the password for your calender.',
          input: 'password',
          inputPlaceholder: 'Re-enter your password',
          inputAttributes: {
            autocapitalize: 'off',
            autocorrect: 'off',
          },
        });
        if (pass === verifyPass) {
          password = pass;
          isPasswordVerified = true;
        } else {
          await MySwal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Passwords do not match.',
            allowOutsideClick: false,
            confirmButtonColor: 'rgba(72, 121, 254, 1)',
          });
        }
      } while (!isPasswordVerified);
      dispatch(setGeneralPassword(password));

      const newCalendar: CalendarModel = {
        name: title,
        dateCreated: Date.now().toString(),
        dateModified: Date.now().toString(),
        version: fileVersion,
        defaultFamilyCard: defaultFamily,
        familyCards: [],
        defaultBusinessCard: defaultBusiness,
        businessCards: [],
        defaultClubCard: defaultClub,
        clubCards: [],
      };

      const fileInfo: WriteFileType = {
        path: general.path,
        password,
        calendar: newCalendar,
      };

      const fileContents = await window.electron.files.writeCalendarFile(
        fileInfo
      );

      if (fileContents.status === 'success') {
        dispatch(setCalendar(fileContents.calendar ?? calendar));
        dispatch(setGeneralError(''));
        navigate('/dashboard');
      } else if (fileContents.status === 'file-error') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Something didn't work. Please try again.",
          allowOutsideClick: false,
          confirmButtonColor: 'rgba(72, 121, 254, 1)',
        });
      }
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter a title.',
        allowOutsideClick: false,
        confirmButtonColor: 'rgba(72, 121, 254, 1)',
      });
    }
    setLoading(false);
  }

  const onKeyDownHandler = (e: { keyCode: number }) => {
    if (e.keyCode === 13) {
      createCalendar();
    }
  };

  return (
    <div className="entermake-body">
      <Row>
        <span className="entermake-subtitle">
          Please enter your calendar name.
        </span>
      </Row>
      <Form.Control
        className="entermake-text-box"
        name="title"
        placeholder="Enter title..."
        value={title}
        disabled={isLoading}
        onChange={(e) => setTitle(e.target.value)}
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
            onClick={() => createCalendar()}
            onKeyDown={onKeyDownHandler}
            tabIndex={0}
          >
            <AddIcon className="entermake-button-icon" width={28} height={32} />
            <p className="entermake-button-text">Create Calendar</p>
          </div>
        )}
      </Row>
    </div>
  );
}

export default MakePassword;
