import { DashboardScreensTypes as ScreenTypes } from 'main/common/screen-types';
import { useAppSelector } from 'renderer/redux/hooks/redux-hooks';
import DashboardTemplate from '../../components/dashboard/DashboardTemplate';

import Home from './Home';
import ListTable from './ListTable';
import CardTable from './CardTable';
import RawScreen from './Raw';

interface DashboardSwitcherProps {
  screen: ScreenTypes;
}

export default function DashboardSwitcher(props: DashboardSwitcherProps) {
  const { screen } = props;
  let content;

  const calendar = useAppSelector((state) => state.calendar);

  switch (screen) {
    case ScreenTypes.Home:
      content = <Home />;
      break;
    case ScreenTypes.FamilyCards:
      content = <CardTable type={ScreenTypes.FamilyCards} />;
      break;
    case ScreenTypes.BusinessCards:
      content = <CardTable type={ScreenTypes.BusinessCards} />;
      break;
    case ScreenTypes.ClubCards:
      content = <CardTable type={ScreenTypes.ClubCards} />;
      break;
    case ScreenTypes.List:
      content = <ListTable />;
      break;
    case ScreenTypes.Raw:
      content = <RawScreen />;
      break;
    default:
      content = <></>;
      break;
  }

  return <DashboardTemplate content={content} screenType={screen} />;
}
