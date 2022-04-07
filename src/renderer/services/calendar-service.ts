import { ReadFileType } from 'main/ipc/types/file-manager-types';
import { CalendarModel, ImportCalendarModel } from '../models/redux-models';

export default {
  async readLegacyCalendarFile(path: string) {
    const fileInfo: ReadFileType = {
      path,
      password: '',
    };
    const response: ImportCalendarModel =
      await window.electron.files.readLegacyCalendarFile(fileInfo);
    return response;
  },
  async readCalendarFile(path: string, password: string) {
    const fileInfo: ReadFileType = {
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
