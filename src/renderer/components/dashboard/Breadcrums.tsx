import { DashboardScreensTypes } from 'main/common/screen-types';

import HomeIcon from '../../assets/icons/HomeIcon';
import SlashIcon from '../../assets/icons/SlashIcon';

interface BreadCrumbProps {
  screenType: DashboardScreensTypes;
}

export default function BreadCrumb(props: BreadCrumbProps) {
  const { screenType } = props;
  return (
    <div className="breadcrumb">
      <div>
        <HomeIcon width={20} height={20} className="breadcrumb-icon" />
        <SlashIcon width={8} height={16} className="breadcrumb-icon" />
        <span className="breadcrumb-text">{screenType}</span>
      </div>
      <div className="breadcrumb--container">
        <span className="breadcrumb-title">{screenType}</span>
      </div>
    </div>
  );
}
