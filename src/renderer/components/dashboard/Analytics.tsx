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

  function findNumberOfOrders() {
    let ord = 0;
    calendar.familyCards.forEach((e) => {
      ord += e.order.amountOfCalendarsPurchased;
    });
    calendar.businessCards.forEach((e) => {
      ord += e.order.amountOfCalendarsPurchased;
    });
    calendar.clubCards.forEach((e) => {
      ord += e.order.amountOfCalendarsPurchased;
    });
    return ord;
  }

  function findNumberOfDonations() {
    let don = 0;
    calendar.familyCards.forEach((e) => {
      don += e.order.amountDonated;
    });
    calendar.businessCards.forEach((e) => {
      don += e.order.amountDonated;
    });
    calendar.clubCards.forEach((e) => {
      don += e.order.amountDonated;
    });
    return don;
  }

  function findNumberOfCalendarEvents() {
    let events = 0;
    calendar.familyCards.forEach((e) => {
      events += e.calendarEvents.length;
    });
    calendar.businessCards.forEach((e) => {
      events += e.calendarEvents.length;
    });
    calendar.clubCards.forEach((e) => {
      events += e.calendarEvents.length;
    });
    return events;
  }

  const [orders] = useState(findNumberOfOrders());
  const [donations] = useState(findNumberOfDonations());
  const [calendarEvents] = useState(findNumberOfCalendarEvents());

  return (
    <div className="analytics-screen">
      <div className="analytics-section">
        <AnalyticCard
          title="Families"
          stats={`${calendar.familyCards.length}`}
          icon={<FamiliesIcon width={42} height={34} className="" />}
          className="analytics-blue"
        />
        <AnalyticCard
          title="Businesses"
          stats={`${calendar.businessCards.length}`}
          icon={<BusinessesIcon width={27} height={36} className="" />}
          className="analytics-blue"
        />{' '}
        <AnalyticCard
          title="Clubs"
          stats={`${calendar.clubCards.length}`}
          icon={<ClubsIcon width={40} height={32} className="" />}
          className="analytics-blue"
        />
        <AnalyticCard
          title="Orders"
          stats={`${orders}`}
          icon={<OrdersIcon width={28} height={38} className="" />}
          className="analytics-green"
        />{' '}
        <AnalyticCard
          title="Donations"
          stats={`$${donations}`}
          icon={<DonationsIcon width={38} height={34} className="" />}
          className="analytics-purple"
        />{' '}
        <AnalyticCard
          title="Calendar Events"
          stats={`${calendarEvents}`}
          icon={<CalendarEventsIcon width={31} height={36} className="" />}
          className="analytics-orange"
        />
      </div>
    </div>
  );
}
