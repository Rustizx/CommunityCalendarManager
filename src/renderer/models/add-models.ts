import { CalendarModel } from './redux-models';

export interface WriteCalendarModel {
  calendar: CalendarModel;
  path: string;
  password: string;
}
