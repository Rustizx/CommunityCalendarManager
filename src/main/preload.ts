import { contextBridge, ipcRenderer } from 'electron';
import { ErrorMessageType } from './ipc/types/dialogs-types';
import { ReadFileType } from './ipc/types/file-manager-types';

contextBridge.exposeInMainWorld('electron', {
  files: {
    readCalendarFile: (fileInfo: ReadFileType) =>
      ipcRenderer.invoke('files:read-calendar-file', fileInfo),
  },
  dialogs: {
    openCalendarFileDialog: () =>
      ipcRenderer.invoke('dialog:open-calender-file'),
    createCalendarFileDialog: () =>
      ipcRenderer.invoke('dialog:create-calender-file'),
    errorMessage(mess: ErrorMessageType) {
      ipcRenderer.send('dialog:error-message', mess);
    },
  },
});
