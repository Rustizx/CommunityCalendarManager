import { ReadFileType, WriteFileType } from 'main/ipc/types/file-manager-types';
import { ImportCalendarModel } from './models/redux-models';

declare global {
  interface Window {
    electron: {
      files: {
        readCalendarFile(fileInfo: ReadFileType): ImportCalendarModel;
        writeCalendarFile(fileInfo: WriteFileType): ImportCalendarModel;
      };
      dialogs: {
        openCalendarFileDialog(): string;
        createCalendarFileDialog(): string;
      };
    };
  }
}

export {};
