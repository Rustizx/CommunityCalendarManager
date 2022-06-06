import { useAppSelector } from '../../redux/hooks/redux-hooks';

export default function RawScreen() {
  const calendar = useAppSelector((state) => state.calendar);
  return (
    <div className="home-screen">
      <pre>{JSON.stringify(calendar, null, 2)}</pre>
    </div>
  );
}
