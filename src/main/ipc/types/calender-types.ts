/* TODO: Make passwords actually encrypt the file instead of being in the file */

export type CalendarType = {
  name: string;
  lastModified: string;
  password: string;
  families?: FamilyType[];
};

export type FamilyType = {
  family_name: string;
};
