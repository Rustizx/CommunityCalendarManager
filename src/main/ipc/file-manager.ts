import { ipcMain } from 'electron';
import { CalendarType } from './types/calender-types';
import { ReadFileType } from './types/file-manager-types';

const fs = require('fs');

function readCalendarFile(fileInfo: ReadFileType) {
  try {
    const data: string = fs.readFileSync(fileInfo.path, 'utf8');
    const fileData: CalendarType = JSON.parse(data);

    if (fileData.password === fileInfo.password) {
      return data;
    }
    return 'bad_password';
  } catch (err) {
    return 'error';
  }
}

export default function FileManager() {
  ipcMain.handle('files:read-calendar-file', (_event, args) => {
    readCalendarFile(args);
  });
}
