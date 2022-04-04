import { useNavigate } from 'react-router-dom';
import { resetCalendar } from '../../store/calendar-slice';
import { resetGeneral } from '../../store/general-slice';
import { useAppDispatch } from '../../hooks/redux-hooks';

import BackButtonIcon from '../../icons/BackButtonIcon';

interface BackButtonProps {
  isVisible: boolean;
}

export default function BackButton(props: BackButtonProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isVisible } = props;

  function goBack() {
    dispatch(resetGeneral());
    dispatch(resetCalendar());
    navigate('/');
  }

  return isVisible ? (
    <div>
      <div
        role="button"
        className="back-button"
        onClick={() => goBack()}
        onKeyDown={() => goBack()}
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
