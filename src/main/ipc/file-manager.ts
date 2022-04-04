import { ipcMain } from 'electron';
import {
  CalendarModel,
  ImportCalendarModel,
} from 'renderer/models/redux-models';
import { ReadFileType, WriteFileType } from './types/file-manager-types';

const fs = require('fs');

function readCalendarFile(fileInfo: ReadFileType): ImportCalendarModel {
  try {
    const data: string = fs.readFileSync(fileInfo.path, 'utf8');
    const fileData: CalendarModel = JSON.parse(data);

    if (fileData.password === fileInfo.password) {
      return {
        status: 'success',
        calendar: fileData,
      };
    }
    return {
      status: 'password-error',
      calendar: fileData,
    };
  } catch (err) {
    return {
      status: 'file-error',
      calendar: undefined,
    };
  }
}

function writeCalendarFile(fileInfo: WriteFileType): ImportCalendarModel {
  try {
    const stringData: string = JSON.stringify(fileInfo.calendar);
    fs.writeFileSync(fileInfo.path, stringData, { encoding: 'utf8' });
  } catch (err) {
    return {
      status: 'file-error',
      calendar: undefined,
    };
  }
  return readCalendarFile({
    path: fileInfo.path,
    password: fileInfo.password,
  });
}

export default function FileManager() {
  ipcMain.handle('files:write-calendar-file', (_event, args) => {
    return writeCalendarFile(args);
  });
  ipcMain.handle('files:read-calendar-file', (_event, args) => {
    return readCalendarFile(args);
  });
}
