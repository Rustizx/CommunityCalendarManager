import { useState } from 'react';
import AnalyticCard from './elements/AnalyticCard';
import FamiliesIcon from '../../icons/analytics/FamiliesIcon';
import BusinessesIcon from '../../icons/analytics/BusinessIcon';
import ClubsIcon from '../../icons/analytics/ClubsIcon';
import CalendarEventsIcon from '../../icons/analytics/CalendarEventsIcon';
import OrdersIcon from '../../icons/analytics/OrdersIcon';
import DonationsIcon from '../../icons/analytics/DonationsIcon';

import { useAppSelector } from '../../hooks/redux-hooks';

export default function AnalyticsScreen() {
  const calendar = useAppSelector((state) => state.calendar);

  const [families, setFamilies] = useState(0);
  const [businesses, setBusinesses] = useState(0);
  const [clubs, setClubs] = useState(0);
  const [orders, setOrders] = useState(0);
  const [donations, setDonations] = useState(0);
  const [calendarEvents, setCalendarEvents] = useState(0);

  function updateStats() {
    setFamilies(calendar.familyCards.length);
    setBusinesses(calendar.businessCards.length);
    setClubs(calendar.clubCards.length);
  }

  updateStats();

  return (
    <div className="analytics-screen">
      <div className="analytics-section">
        <AnalyticCard
          title="Families"
          stats={families}
          icon={<FamiliesIcon width={42} height={34} className="" />}
          className="analytics-blue"
        />
        <AnalyticCard
          title="Businesses"
          stats={businesses}
          icon={<BusinessesIcon width={27} height={36} className="" />}
          className="analytics-blue"
        />{' '}
        <AnalyticCard
          title="Clubs"
          stats={clubs}
          icon={<ClubsIcon width={40} height={32} className="" />}
          className="analytics-blue"
        />
        <AnalyticCard
          title="Orders"
          stats={orders}
          icon={<OrdersIcon width={28} height={38} className="" />}
          className="analytics-green"
        />{' '}
        <AnalyticCard
          title="Donations"
          stats={donations}
          icon={<DonationsIcon width={38} height={34} className="" />}
          className="analytics-purple"
        />{' '}
        <AnalyticCard
          title="Calendar Events"
          stats={calendarEvents}
          icon={<CalendarEventsIcon width={31} height={36} className="" />}
          className="analytics-orange"
        />
      </div>
    </div>
  );
}
