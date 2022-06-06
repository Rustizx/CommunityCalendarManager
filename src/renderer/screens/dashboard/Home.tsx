import { useState } from 'react';

import AnalyticCard from '../../components/dashboard/AnalyticCard';
import dashIcons from '../../assets/icons/dashboard';

import { useAppSelector } from '../../redux/hooks/redux-hooks';

export default function HomeScreen() {
  const calendar = useAppSelector((state) => state.calendar);

  function findNumberOfOrders() {
    let ord = 0;
    calendar.familyCards.forEach((e) => {
      ord +=
        e.order.amountOfCalendarsPurchased === ''
          ? 0
          : parseInt(e.order.amountOfCalendarsPurchased, 10);
    });
    calendar.businessCards.forEach((e) => {
      ord +=
        e.order.amountOfCalendarsPurchased === ''
          ? 0
          : parseInt(e.order.amountOfCalendarsPurchased, 10);
    });
    calendar.clubCards.forEach((e) => {
      ord +=
        e.order.amountOfCalendarsPurchased === ''
          ? 0
          : parseInt(e.order.amountOfCalendarsPurchased, 10);
    });
    return ord;
  }

  function findNumberOfDonations() {
    let don = 0;
    calendar.familyCards.forEach((e) => {
      don +=
        e.order.amountDonated === '' ? 0 : parseInt(e.order.amountDonated, 10);
    });
    calendar.businessCards.forEach((e) => {
      don +=
        e.order.amountDonated === '' ? 0 : parseInt(e.order.amountDonated, 10);
    });
    calendar.clubCards.forEach((e) => {
      don +=
        e.order.amountDonated === '' ? 0 : parseInt(e.order.amountDonated, 10);
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
    <div className="home-screen">
      <div className="home-section">
        <AnalyticCard
          title="Families"
          stats={`${calendar.familyCards.length}`}
          icon={<dashIcons.FamiliesIcon width={42} height={34} className="" />}
          className="home-blue"
        />
        <AnalyticCard
          title="Businesses"
          stats={`${calendar.businessCards.length}`}
          icon={<dashIcons.BusinessIcon width={27} height={36} className="" />}
          className="home-blue"
        />{' '}
        <AnalyticCard
          title="Clubs"
          stats={`${calendar.clubCards.length}`}
          icon={<dashIcons.ClubsIcon width={40} height={32} className="" />}
          className="home-blue"
        />
        <AnalyticCard
          title="Orders"
          stats={`${orders}`}
          icon={<dashIcons.OrdersIcon width={28} height={38} className="" />}
          className="home-green"
        />{' '}
        <AnalyticCard
          title="Donations"
          stats={`$${donations}`}
          icon={<dashIcons.DonationsIcon width={38} height={34} className="" />}
          className="home-purple"
        />{' '}
        <AnalyticCard
          title="Calendar Events"
          stats={`${calendarEvents}`}
          icon={
            <dashIcons.CalendarEventsIcon width={31} height={36} className="" />
          }
          className="home-orange"
        />
      </div>
    </div>
  );
}
