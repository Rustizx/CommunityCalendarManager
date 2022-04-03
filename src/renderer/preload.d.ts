import { ReadFileType } from 'main/ipc/types/file-manager-types';

declare global {
  interface Window {
    electron: {
      files: {
        readCalendarFile(fileInfo: ReadFileType): string;
      };
      dialogs: {
        openCalendarFileDialog(): string;
        createCalendarFileDialog(): string;
      };
    };
  }
}

export {};
