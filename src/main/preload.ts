import { contextBridge, ipcRenderer } from 'electron';
import {
  ReadFileModel,
  WriteCalendarFileModel,
  WriteCSVFileModel,
} from './models/ipc-models';

contextBridge.exposeInMainWorld('electron', {
  files: {
    readCalendarFile: (fileInfo: ReadFileModel) =>
      ipcRenderer.invoke('files:read-calendar-file', fileInfo),
    readLegacyCalendarFile: (fileInfo: ReadFileModel) =>
      ipcRenderer.invoke('files:read-legacy-file', fileInfo),
    writeCalendarFile: (fileInfo: WriteCalendarFileModel) =>
      ipcRenderer.invoke('files:write-calendar-file', fileInfo),
    writeFamilyCardPDF: (fileInfo: WriteCalendarFileModel) =>
      ipcRenderer.invoke('files:write-family-pdf-file', fileInfo),
    writeBusinessCardPDF: (fileInfo: WriteCalendarFileModel) =>
      ipcRenderer.invoke('files:write-business-pdf-file', fileInfo),
    writeClubCardPDF: (fileInfo: WriteCalendarFileModel) =>
      ipcRenderer.invoke('files:write-club-pdf-file', fileInfo),
    writeCSV: (fileInfo: WriteCSVFileModel) =>
      ipcRenderer.invoke('files:write-csv-file', fileInfo),
  },
  dialogs: {
    openCalendarFileDialog: () =>
      ipcRenderer.invoke('dialog:open-calender-file'),
    createCalendarFileDialog: () =>
      ipcRenderer.invoke('dialog:create-calender-file'),
    createPDFFileDialog: () => ipcRenderer.invoke('dialog:create-pdf-file'),
    createCSVDialog: () => ipcRenderer.invoke('dialog:create-csv-file'),
  },
});
