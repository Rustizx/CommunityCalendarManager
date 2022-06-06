import CalendarModel, { CalendarEventModel } from './calendar-model';

export interface ReadFileModel {
  path: string;
  password: string;
}

export interface WriteCalendarFileModel {
  path: string;
  password: string;
  calendar: CalendarModel;
}

export interface EncryptedFileModel {
  iv: string;
  encryptedData: string;
}

export interface SortCalendarEventFromDate {
  event: CalendarEventModel;
  date: Date;
}

export interface ImportCalendarModel {
  status: string;
  calendar?: CalendarModel;
}

export interface WriteCSVFileModel {
  path: string;
  events: CalendarEventModel[];
}
