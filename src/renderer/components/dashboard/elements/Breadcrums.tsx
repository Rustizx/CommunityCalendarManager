import HomeIcon from '../../../icons/HomeIcon';
import { DashboardScreensTypes } from '../../../common/ScreenTypes';
import SlashIcon from '../../../icons/SlashIcon';

interface BreadCrumbProps {
  screen: DashboardScreensTypes;
}

export default function BreadCrumb(props: BreadCrumbProps) {
  const { screen } = props;
  return (
    <div className="breadcrumb">
      <div>
        <HomeIcon width={20} height={20} className="breadcrumb-icon" />
        <SlashIcon width={8} height={16} className="breadcrumb-icon" />
        <span className="breadcrumb-text">Dashboards</span>
        <SlashIcon width={8} height={16} className="breadcrumb-icon" />
        <span className="breadcrumb-text">{screen}</span>
      </div>
      <div className="breadcrumb--container">
        <span className="breadcrumb-title">{screen}</span>
      </div>
    </div>
  );
}
