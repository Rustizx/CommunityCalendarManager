import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/App.scss';

import IntroScreens from './screens/IntroScreens';
import ScreenTypes from './common/ScreenTypes';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroScreens type={ScreenTypes.Welcome} />} />
        <Route
          path="/enter-password"
          element={<IntroScreens type={ScreenTypes.EnterPassword} />}
        />
        <Route
          path="/reset-password"
          element={<IntroScreens type={ScreenTypes.ResetPassword} />}
        />
        <Route
          path="/make-password"
          element={<IntroScreens type={ScreenTypes.MakePassword} />}
        />
      </Routes>
    </Router>
  );
}
