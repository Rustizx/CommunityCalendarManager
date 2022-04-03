import { ipcMain, dialog } from 'electron';
import { ErrorMessageType } from './types/dialogs-types';

function errorBox(mess: ErrorMessageType) {
  dialog.showErrorBox(mess.title, mess.message);
}

async function openCalendarFileDialog() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: 'Open Calendar',
    filters: [
      { name: 'CalFunder Files', extensions: ['calfunder'] },
      { name: 'All Files', extensions: ['*'] },
    ],
    properties: ['openFile'],
  });
  if (canceled) {
    return '';
  }
  return filePaths[0];
}

async function createCalendarFileDialog() {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Create Calendar',
    filters: [
      { name: 'CalFunder Files', extensions: ['calfunder'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });
  if (canceled) {
    return '';
  }
  return filePath;
}

export default function Dialogs() {
  ipcMain.handle('dialog:open-calender-file', openCalendarFileDialog);
  ipcMain.handle('dialog:create-calender-file', createCalendarFileDialog);
  ipcMain.on('dialog:error-message', async (_event, arg) => {
    errorBox(arg);
  });
}
