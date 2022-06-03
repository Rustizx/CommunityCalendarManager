import {
  ReadFileModel,
  WriteCalendarFileModel,
  ImportCalendarModel,
} from 'main/models/ipc-models';

declare global {
  interface Window {
    electron: {
      files: {
        readCalendarFile(fileInfo: ReadFileModel): ImportCalendarModel;
        writeCalendarFile(
          fileInfo: WriteCalendarFileModel
        ): ImportCalendarModel;
        writeFamilyCardPDF(fileInfo: WriteCalendarFileModel): string;
        writeBusinessCardPDF(fileInfo: WriteCalendarFileModel): string;
        writeClubCardPDF(fileInfo: WriteCalendarFileModel): string;
        readLegacyCalendarFile(fileInfo: ReadFileModel): ImportCalendarModel;
      };
      dialogs: {
        openCalendarFileDialog(): string;
        createCalendarFileDialog(): string;
        createPDFFileDialog(): string;
      };
    };
  }
}

export {};
