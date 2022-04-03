import { useNavigate } from 'react-router-dom';

import BackButtonIcon from '../../icons/BackButtonIcon';

interface BackButtonProps {
  isVisible: boolean;
}

export default function BackButton(props: BackButtonProps) {
  const { isVisible } = props;
  const navigate = useNavigate();

  return isVisible ? (
    <div>
      <div
        role="button"
        className="back-button"
        onClick={() => navigate('/')}
        onKeyDown={() => navigate('/')}
        tabIndex={-1}
      >
        <BackButtonIcon className="" width={32} height={32} />
        <span className="back-button-text">Back</span>
      </div>
    </div>
  ) : (
    <></>
  );
}
