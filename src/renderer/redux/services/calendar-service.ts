import CalendarModel from 'main/models/calendar-model';
import { ImportCalendarModel, ReadFileModel } from 'main/models/ipc-models';

export default {
  async readLegacyCalendarFile(path: string) {
    const fileInfo: ReadFileModel = {
      path,
      password: '',
    };
    const response: ImportCalendarModel =
      await window.electron.files.readLegacyCalendarFile(fileInfo);
    return response;
  },
  async readCalendarFile(path: string, password: string) {
    const fileInfo: ReadFileModel = {
      path,
      password,
    };
    const response: ImportCalendarModel =
      await window.electron.files.readCalendarFile(fileInfo);
    return response;
  },
  async writeCalendarFile(
    path: string,
    password: string,
    calendar: CalendarModel
  ) {
    await window.electron.files.writeCalendarFile({
      path,
      password,
      calendar,
    });
  },
};
