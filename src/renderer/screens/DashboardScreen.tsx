import { useAppSelector } from '../hooks/redux-hooks';
import BackButton from '../components/intro/BackButton';

function DashboardScreen() {
  // const dispatch = useAppDispatch();
  const calendar = useAppSelector((state) => state.calendar);

  return (
    <div>
      <BackButton isVisible />
      <p>{calendar.name}</p>
      <p>{calendar.dateCreated}</p>
      <p>{calendar.dateModified}</p>
      <p>{calendar.password}</p>
      <p>{calendar.version}</p>
      <p>{calendar.families}</p>
    </div>
  );
}

export default DashboardScreen;
