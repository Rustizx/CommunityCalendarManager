import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { WriteCalendarModel } from '../models/add-models';
import CalendarService from '../services/calendar-service';
import {
  BusinessCardModel,
  FamilyCardModel,
  ImportCalendarModel,
} from '../models/redux-models';
import DashboardSwitcher from '../components/dashboard/DashboardSwitcher';
import SettingsIcon from '../icons/SettingsIcon';

import { DashboardScreensTypes as ScreenTypes } from '../common/ScreenTypes';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import VerticalLine from '../icons/VerticalLine';
import { resetGeneral } from '../store/general-slice';
import { addCard, resetCalendar } from '../store/calendar-slice';
import BreadCrumb from '../components/dashboard/elements/Breadcrums';

function DashboardScreens() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [screen, setScreen] = useState(ScreenTypes.Analytics);
  const [onCards, setOnCards] = useState(false);
  const calendar = useAppSelector((state) => state.calendar);
  const general = useAppSelector((state) => state.general);

  const changeScreen = (screenType: ScreenTypes) => {
    if (screenType === ScreenTypes.FamilyCards) {
      setOnCards(true);
    } else if (screenType === ScreenTypes.BusinessCards) {
      setOnCards(true);
    } else if (screenType === ScreenTypes.ClubCards) {
      setOnCards(true);
    } else {
      setOnCards(false);
    }

    setScreen(screenType);
  };

  async function addLegacyCards() {
    const filePath: string =
      await window.electron.dialogs.openCalendarFileDialog();
    const legacyCalendar: ImportCalendarModel =
      await CalendarService.readLegacyCalendarFile(filePath);

    const addFamily: FamilyCardModel[] = [];
    const addBusiness: BusinessCardModel[] = [];

    if (legacyCalendar.calendar !== undefined) {
      for (let x = 0; x < legacyCalendar.calendar.familyCards.length; x += 1) {
        addFamily.push(legacyCalendar.calendar.familyCards[x]);
      }
      for (
        let x = 0;
        x < legacyCalendar.calendar.businessCards.length;
        x += 1
      ) {
        addBusiness.push(legacyCalendar.calendar.businessCards[x]);
      }
    }
    const tempCalendar = {
      ...calendar,
      familyCards: addFamily,
      businessCards: addBusiness,
    };

    const calendarWrite: WriteCalendarModel = {
      calendar: tempCalendar,
      path: general.path,
      password: general.password,
    };
    dispatch(addCard(calendarWrite));
  }

  function goBack() {
    dispatch(resetGeneral());
    dispatch(resetCalendar());
    navigate('/');
  }

  return (
    <div className="dashboard-background">
      <div className="navbar-background">
        <Col className="navbar-left">
          <span className="navbar-title">CalFunder</span>
          <VerticalLine height={42} className="" />
          <div
            role="button"
            onClick={() => changeScreen(ScreenTypes.Analytics)}
            onKeyDown={() => changeScreen(ScreenTypes.Analytics)}
            tabIndex={-1}
          >
            <span
              className={
                screen === ScreenTypes.Analytics
                  ? 'navbar-link-selected'
                  : 'navbar-link'
              }
            >
              Analytics
            </span>
          </div>
          <div>
            <Dropdown>
              <Dropdown.Toggle as={Button} variant="light">
                <span
                  className={onCards ? 'navbar-link-selected' : 'navbar-link'}
                >
                  Cards
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => changeScreen(ScreenTypes.FamilyCards)}
                >
                  <span
                    className={
                      screen === ScreenTypes.FamilyCards
                        ? 'navbar-link-sublink-selected'
                        : 'navbar-sublink'
                    }
                  >
                    Family Cards
                  </span>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => changeScreen(ScreenTypes.BusinessCards)}
                >
                  <span
                    className={
                      screen === ScreenTypes.BusinessCards
                        ? 'navbar-link-sublink-selected'
                        : 'navbar-sublink'
                    }
                  >
                    Business Cards
                  </span>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => changeScreen(ScreenTypes.ClubCards)}
                >
                  <span
                    className={
                      screen === ScreenTypes.ClubCards
                        ? 'navbar-link-sublink-selected'
                        : 'navbar-sublink'
                    }
                  >
                    Club Cards
                  </span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div
            role="button"
            onClick={() => changeScreen(ScreenTypes.List)}
            onKeyDown={() => changeScreen(ScreenTypes.List)}
            tabIndex={-1}
          >
            <span
              className={
                screen === ScreenTypes.List
                  ? 'navbar-link-selected'
                  : 'navbar-link'
              }
            >
              List
            </span>
          </div>
        </Col>
        <Col className="navbar-right">
          <VerticalLine height={42} className="navbar-line" />
          <span className="navbar-calendar-name">{calendar.name}</span>
          <Dropdown>
            <Dropdown.Toggle as={Button} variant="light">
              <SettingsIcon height={20} width={20} className="navbar-icon" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => addLegacyCards()}>
                <span className="navbar-sublink">Add Legacy Cards</span>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => goBack()}>
                <span className="navbar-sublink">Exit Calendar</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </div>
      <BreadCrumb screen={screen} />
      <div className="dashboard-container">
        <DashboardSwitcher screen={screen} />
      </div>
    </div>
  );
}

export default DashboardScreens;
