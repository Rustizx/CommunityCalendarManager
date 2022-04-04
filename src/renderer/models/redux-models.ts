export interface FamilyModel {
  family_name: string;
}

export interface ImportCalendarModel {
  status: string;
  calendar?: CalendarModel;
}

export interface CalendarModel {
  name: string;
  dateCreated: string;
  dateModified: string;
  version: string;
  password: string;
  families?: FamilyModel[];
}

export interface GeneralModel {
  isFileLoaded: boolean;
  path: string;
  password: string;
  error: string;
}
