import { DashboardScreensTypes as ScreenTypes } from 'main/common/screen-types';
import DashboardTemplate from '../../components/dashboard/DashboardTemplate';

import Home from './Home';
import BusinessCardsTable from './BusinessCardsTable';
import ClubCardsTable from './ClubCardsTable';
import FamilyCardsTable from './FamilyCardsTable';
import ListTable from './ListTable';

interface DashboardSwitcherProps {
  screen: ScreenTypes;
}

export default function DashboardSwitcher(props: DashboardSwitcherProps) {
  const { screen } = props;
  let content;

  switch (screen) {
    case ScreenTypes.Home:
      content = <Home />;
      break;
    case ScreenTypes.FamilyCards:
      content = <FamilyCardsTable />;
      break;
    case ScreenTypes.BusinessCards:
      content = <BusinessCardsTable />;
      break;
    case ScreenTypes.ClubCards:
      content = <ClubCardsTable />;
      break;
    case ScreenTypes.List:
      content = <ListTable />;
      break;
    default:
      content = <></>;
      break;
  }

  return <DashboardTemplate content={content} screenType={screen} />;
}
