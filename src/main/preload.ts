import { contextBridge, ipcRenderer } from 'electron';
import { ReadFileType, WriteFileType } from './ipc/types/file-manager-types';

contextBridge.exposeInMainWorld('electron', {
  files: {
    readCalendarFile: (fileInfo: ReadFileType) =>
      ipcRenderer.invoke('files:read-calendar-file', fileInfo),
    readLegacyCalendarFile: (fileInfo: ReadFileType) =>
      ipcRenderer.invoke('files:read-legacy-file', fileInfo),
    writeCalendarFile: (fileInfo: WriteFileType) =>
      ipcRenderer.invoke('files:write-calendar-file', fileInfo),
    writeFamilyCardPDF: (fileInfo: WriteFileType) =>
      ipcRenderer.invoke('files:write-family-pdf-file', fileInfo),
    writeBusinessCardPDF: (fileInfo: WriteFileType) =>
      ipcRenderer.invoke('files:write-business-pdf-file', fileInfo),
    writeClubCardPDF: (fileInfo: WriteFileType) =>
      ipcRenderer.invoke('files:write-club-pdf-file', fileInfo),
  },
  dialogs: {
    openCalendarFileDialog: () =>
      ipcRenderer.invoke('dialog:open-calender-file'),
    createCalendarFileDialog: () =>
      ipcRenderer.invoke('dialog:create-calender-file'),
    createPDFFileDialog: () => ipcRenderer.invoke('dialog:create-pdf-file'),
  },
});
