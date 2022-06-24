import {
  ReadFileModel,
  WriteCalendarFileModel,
  ImportCalendarModel,
  WriteCSVFileModel,
} from 'main/models/ipc-models';

declare global {
  interface Window {
    electron: {
      files: {
        readCalendarFile(fileInfo: ReadFileModel): ImportCalendarModel;
        writeCalendarFile(
          fileInfo: WriteCalendarFileModel
        ): ImportCalendarModel;
        writeLabelPDF(fileInfo: WriteCalendarFileModel): string;
        writeFamilyCardPDF(fileInfo: WriteCalendarFileModel): string;
        writeBusinessCardPDF(fileInfo: WriteCalendarFileModel): string;
        writeClubCardPDF(fileInfo: WriteCalendarFileModel): string;
        readLegacyCalendarFile(fileInfo: ReadFileModel): ImportCalendarModel;
        writeCSV(fileInfo: WriteCSVFileModel): string;
      };
      dialogs: {
        openCalendarFileDialog(): string;
        createCalendarFileDialog(): string;
        createPDFFileDialog(): string;
        createCSVDialog(): string;
      };
    };
  }
}

export {};
