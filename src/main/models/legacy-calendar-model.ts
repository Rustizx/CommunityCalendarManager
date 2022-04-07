export interface LegacyCalendarEventModel {
  name: string;
  type: string;
  date: string;
}

export interface LegacyFamilyModels {
  id: string;
  familyname: string;
  firstnames: string[];
  homephone: string;
  workphone: string;
  address: string;
  city: string;
  purchased: string;
  province: string;
  postal: string;
  calendar: LegacyCalendarEventModel[];
  donation?: boolean;
  business?: boolean;
}
