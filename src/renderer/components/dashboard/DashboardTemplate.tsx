import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import { BusinessCardModel, FamilyCardModel } from 'main/models/calendar-model';
import {
  ImportCalendarModel,
  WriteCalendarFileModel,
} from 'main/models/ipc-models';
import routePaths from 'main/common/route-paths';
import { DashboardScreensTypes as ScreenTypes } from 'main/common/screen-types';

import CalendarService from '../../redux/services/calendar-service';
import SettingsIcon from '../../assets/icons/SettingsIcon';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux-hooks';
import VerticalLine from '../../assets/icons/VerticalLine';
import { resetGeneral } from '../../redux/store/general-slice';
import { addCard, resetCalendar } from '../../redux/store/calendar-slice';
import Breadcrumb from './Breadcrums';

interface DashboardTemplateProps {
  content: ReactNode;
  screenType: ScreenTypes;
}

export default function DashboardTemplate(props: DashboardTemplateProps) {
  const { content, screenType } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const calendar = useAppSelector((state) => state.calendar);
  const general = useAppSelector((state) => state.general);

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

    const calendarWrite: WriteCalendarFileModel = {
      calendar: tempCalendar,
      path: general.path,
      password: general.password,
    };
    dispatch(addCard(calendarWrite));
  }

  function exitCalendar() {
    dispatch(resetGeneral());
    dispatch(resetCalendar());
    navigate(routePaths.welcome);
  }

  return (
    <div className="dashboard-background">
      <div className="navbar-background">
        <Col className="navbar-left">
          <span className="navbar-title">CalFunder</span>
          <VerticalLine height={42} className="" />
          <div
            role="button"
            onClick={() => navigate(routePaths.home)}
            onKeyDown={() => navigate(routePaths.home)}
            tabIndex={-1}
          >
            <span
              className={
                screenType === ScreenTypes.Home
                  ? 'navbar-link-selected'
                  : 'navbar-link'
              }
            >
              Home
            </span>
          </div>
          <div>
            <Dropdown>
              <Dropdown.Toggle as={Button} variant="light">
                <span
                  className={
                    screenType === ScreenTypes.FamilyCards ||
                    screenType === ScreenTypes.BusinessCards ||
                    screenType === ScreenTypes.ClubCards
                      ? 'navbar-link-selected'
                      : 'navbar-link'
                  }
                >
                  Cards
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate(routePaths.familyCards)}>
                  <span
                    className={
                      screenType === ScreenTypes.FamilyCards
                        ? 'navbar-link-sublink-selected'
                        : 'navbar-sublink'
                    }
                  >
                    Family Cards
                  </span>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate(routePaths.businessCards)}
                >
                  <span
                    className={
                      screenType === ScreenTypes.BusinessCards
                        ? 'navbar-link-sublink-selected'
                        : 'navbar-sublink'
                    }
                  >
                    Business Cards
                  </span>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(routePaths.clubCards)}>
                  <span
                    className={
                      screenType === ScreenTypes.ClubCards
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
            onClick={() => navigate(routePaths.list)}
            onKeyDown={() => navigate(routePaths.list)}
            tabIndex={-1}
          >
            <span
              className={
                screenType === ScreenTypes.List
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
              <Dropdown.Item onClick={() => exitCalendar()}>
                <span className="navbar-sublink">Exit Calendar</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </div>
      <Breadcrumb screenType={screenType} />
      <div className="dashboard-container">{content}</div>
    </div>
  );
}
