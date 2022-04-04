import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/App.scss';

import IntroScreens from './screens/IntroScreens';
import ScreenTypes from './common/ScreenTypes';
import DashboardScreens from './screens/DashboardScreens';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroScreens type={ScreenTypes.Welcome} />} />
        <Route
          path="/enter-calendar"
          element={<IntroScreens type={ScreenTypes.EnterPassword} />}
        />
        <Route
          path="/reset-password"
          element={<IntroScreens type={ScreenTypes.ResetPassword} />}
        />
        <Route
          path="/make-calendar"
          element={<IntroScreens type={ScreenTypes.MakePassword} />}
        />
        <Route path="/dashboard" element={<DashboardScreens />} />
      </Routes>
    </Router>
  );
}
