import { ipcMain } from 'electron';
import {
  CalendarModel,
  ImportCalendarModel,
} from 'renderer/models/redux-models';
import { ReadFileType, WriteFileType } from './types/file-manager-types';
import { EncryptedFileType, encrypt, decrypt } from './service/encryption';

const fs = require('fs');

function readCalendarFile(fileInfo: ReadFileType): ImportCalendarModel {
  try {
    const rawData: string = fs.readFileSync(fileInfo.path, 'utf8');
    const encryptedData: EncryptedFileType = JSON.parse(rawData);

    const decryptedData: string = decrypt(encryptedData, fileInfo.password);

    try {
      const data: CalendarModel = JSON.parse(decryptedData);
      return {
        status: 'success',
        calendar: data,
      };
    } catch (e) {
      return {
        status: 'password-error',
        calendar: undefined,
      };
    }
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

    const encryptedData: EncryptedFileType = encrypt(
      stringData,
      fileInfo.password
    );

    const rawData: string = JSON.stringify(encryptedData);

    fs.writeFileSync(fileInfo.path, rawData, { encoding: 'utf8' });
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
