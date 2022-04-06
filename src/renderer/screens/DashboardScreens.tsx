import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import DashboardSwitcher from '../components/dashboard/DashboardSwitcher';
import SettingsIcon from '../icons/SettingsIcon';
import Footer from '../components/Footer';

import { DashboardScreensTypes as ScreenTypes } from '../common/ScreenTypes';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import VerticalLine from '../icons/VerticalLine';
import { resetGeneral } from '../store/general-slice';
import { addDemo, resetCalendar } from '../store/calendar-slice';
import BreadCrumb from '../components/dashboard/elements/Breadcrums';

function DashboardScreens() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [screen, setScreen] = useState(ScreenTypes.Analytics);
  const [onCards, setOnCards] = useState(false);
  const calendar = useAppSelector((state) => state.calendar);

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

  function addDemoState() {
    dispatch(addDemo());
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
              <Dropdown.Item onClick={() => addDemoState()}>
                <span className="navbar-sublink">Add Demo State</span>
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
      <Footer className="dashboard-footer-text" />
    </div>
  );
}

export default DashboardScreens;
