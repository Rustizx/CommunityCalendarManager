import { ReadFileType } from 'main/ipc/types/file-manager-types';
import { ImportCalendarModel } from '../models/redux-models';

export default {
  async readCalendarFile(path: string, password: string) {
    const fileInfo: ReadFileType = {
      path,
      password,
    };
    const response: ImportCalendarModel =
      await window.electron.files.readCalendarFile(fileInfo);
    return response;
  },
};
