import Row from 'react-bootstrap/Row';

import Welcome from '../componets/intro/Welcome';
import MakePassword from '../componets/intro/MakePassword';
import EnterPassword from '../componets/intro/EnterPassword';

import BackButton from '../componets/intro/BackButton';
import Footer from '../componets/Footer';

import ScreenTypes from '../common/ScreenTypes';

interface IntroScreensProps {
  type: string;
}

function IntroScreens(props: IntroScreensProps) {
  const { type } = props;
  let isBackButtonVisable = true;
  let child = <></>;
  if (type === ScreenTypes.Welcome) {
    isBackButtonVisable = false;
    child = <Welcome />;
  } else if (type === ScreenTypes.MakePassword) {
    child = <MakePassword />;
  } else if (type === ScreenTypes.EnterPassword) {
    child = <EnterPassword />;
  }

  return (
    <div className="intro-background">
      <div className="intro-box">
        <Row className="intro-title-row">
          <span className="intro-title">CalFunder</span>
        </Row>
        <Row className="intro-subtitle-row">
          <span className="intro-subtitle">A Community Calendar Manager</span>
        </Row>
        <Row>
          <div className="intro-line" />
        </Row>
        <BackButton isVisible={isBackButtonVisable} />
        <Row>
          <div className="intro-container">{child}</div>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export default IntroScreens;