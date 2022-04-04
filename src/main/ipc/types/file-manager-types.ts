import { CalendarModel } from 'renderer/models/redux-models';

export type ReadFileType = {
  path: string;
  password: string;
};

export type WriteFileType = {
  path: string;
  password: string;
  calendar: CalendarModel;
};
