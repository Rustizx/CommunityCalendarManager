import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/App.scss';

import routePaths from 'main/common/route-paths';
import {
  DashboardScreensTypes,
  IntroScreenTypes,
} from 'main/common/screen-types';

import IntroScreens from './screens/IntroScreens';
import Dashboard from './screens/dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* INTRO SCREENS */}
        <Route
          path={routePaths.welcome}
          element={<IntroScreens type={IntroScreenTypes.Welcome} />}
        />
        <Route
          path={routePaths.enterPassword}
          element={<IntroScreens type={IntroScreenTypes.EnterPassword} />}
        />
        <Route
          path={routePaths.resetPassword}
          element={<IntroScreens type={IntroScreenTypes.ResetPassword} />}
        />
        <Route
          path={routePaths.makeCalendar}
          element={<IntroScreens type={IntroScreenTypes.MakeCalendar} />}
        />
        {/* DASHBOARD SCREENS */}
        <Route
          path={routePaths.home}
          element={<Dashboard screen={DashboardScreensTypes.Home} />}
        />
        <Route
          path={routePaths.familyCards}
          element={<Dashboard screen={DashboardScreensTypes.FamilyCards} />}
        />
        <Route
          path={routePaths.businessCards}
          element={<Dashboard screen={DashboardScreensTypes.BusinessCards} />}
        />
        <Route
          path={routePaths.clubCards}
          element={<Dashboard screen={DashboardScreensTypes.ClubCards} />}
        />
        <Route
          path={routePaths.list}
          element={<Dashboard screen={DashboardScreensTypes.List} />}
        />
      </Routes>
    </Router>
  );
}
