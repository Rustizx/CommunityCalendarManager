import { ipcMain } from 'electron';
import { months } from '../common/constants';
import EmptyCard from '../common/empty-cards';
import { LegacyFamilyModels } from '../models/legacy-calendar-model';
import CalendarModel, {
  CalendarEventModel,
  CardModel,
} from '../models/calendar-model';
import {
  EncryptedFileModel,
  ImportCalendarModel,
  ReadFileModel,
  WriteCalendarFileModel,
} from '../models/ipc-models';
import { encrypt, decrypt } from './service/encryption';
import { familyCardsPDF, businessCardsPDF, clubCardsPDF } from './service/pdf';

const fs = require('fs');

function readCalendarFile(fileInfo: ReadFileModel): ImportCalendarModel {
  try {
    const rawData: string = fs.readFileSync(fileInfo.path, 'utf8');
    const encryptedData: EncryptedFileModel = JSON.parse(rawData);

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

function readLegacyCalendarFile(fileInfo: ReadFileModel): ImportCalendarModel {
  try {
    const data: LegacyFamilyModels[] = JSON.parse(
      fs.readFileSync(fileInfo.path, 'utf8')
    );
    const familyCards: CardModel[] = [];
    const businessCards: CardModel[] = [];

    for (let x = 0; x < data.length; x += 1) {
      const cal: CalendarEventModel[] = [];
      for (let y = 0; y < data[x].calendar.length; y += 1) {
        cal.push({
          name: data[x].calendar[y].name,
          type: data[x].calendar[y].type,
          date: {
            month: `${
              months[parseInt(data[x].calendar[y].date.slice(5, 7), 10) - 1]
            }`,
            day: `${data[x].calendar[y].date.slice(8, 10)}`,
          },
        });
      }
      if (data[x].business !== undefined && data[x].business === true) {
        businessCards.push({
          id: data[x].id,
          name: data[x].familyname,
          contacts: [
            {
              firstName: data[x].firstnames[0].split(' ')[0],
              lastName: data[x].firstnames[0].split(' ')[1],
            },
          ],
          contactDetails: {
            homePhone: data[x].homephone,
            workPhone: data[x].workphone,
            email: '',
          },
          address: {
            addressLine: data[x].address,
            city: data[x].city,
            province: data[x].province,
            postalCode: data[x].postal,
          },
          calendarEvents: cal,
          order: {
            amountOfCalendarsPurchased: data[x].purchased,
            amountDonated: '0',
            didDonated: data[x].donation ?? false,
          },
        });
      } else {
        familyCards.push({
          id: data[x].id,
          name: data[x].familyname,
          contacts: [
            {
              firstName: data[x].firstnames[0],
              lastName: data[x].familyname,
            },
            data[x].firstnames[1] !== undefined
              ? {
                  firstName: data[x].firstnames[1],
                  lastName: data[x].familyname,
                }
              : { firstName: '', lastName: '' },
          ],
          contactDetails: {
            homePhone: data[x].homephone,
            workPhone: data[x].workphone,
            email: '',
          },
          address: {
            addressLine: data[x].address,
            city: data[x].city,
            province: data[x].province,
            postalCode: data[x].postal,
          },
          calendarEvents: cal,
          order: {
            amountOfCalendarsPurchased: data[x].purchased,
            amountDonated: '0',
            didDonated: data[x].donation ?? false,
          },
        });
      }
    }

    const calendar: CalendarModel = {
      name: '',
      dateCreated: '',
      dateModified: '',
      version: '',
      defaultCard: EmptyCard,
      familyCards,
      businessCards,
      clubCards: [],
    };

    return {
      status: 'success',
      calendar,
    };
  } catch (err) {
    return {
      status: 'file-error',
      calendar: undefined,
    };
  }
}

function writeCalendarFile(
  fileInfo: WriteCalendarFileModel
): ImportCalendarModel {
  try {
    const stringData: string = JSON.stringify(fileInfo.calendar);

    const encryptedData: EncryptedFileModel = encrypt(
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

function writeFamilyCardPDF(fileInfo: WriteCalendarFileModel): boolean {
  try {
    const { familyCards } = fileInfo.calendar;

    const pdfData = familyCardsPDF(familyCards);

    fs.writeFileSync(fileInfo.path, pdfData, { encoding: 'utf8' });
    return true;
  } catch (err) {
    return false;
  }
}

function writeBusinessCardPDF(fileInfo: WriteCalendarFileModel): boolean {
  try {
    const { businessCards } = fileInfo.calendar;

    const pdfData = businessCardsPDF(businessCards);

    fs.writeFileSync(fileInfo.path, pdfData, { encoding: 'utf8' });
    return true;
  } catch (err) {
    return false;
  }
}

function writeClubCardPDF(fileInfo: WriteCalendarFileModel): boolean {
  try {
    const { clubCards } = fileInfo.calendar;

    const pdfData = clubCardsPDF(clubCards);

    fs.writeFileSync(fileInfo.path, pdfData, { encoding: 'utf8' });
    return true;
  } catch (err) {
    return false;
  }
}

export default function FileManager() {
  ipcMain.handle('files:write-calendar-file', (_event, args) => {
    return writeCalendarFile(args);
  });
  ipcMain.handle('files:read-calendar-file', (_event, args) => {
    return readCalendarFile(args);
  });
  ipcMain.handle('files:write-family-pdf-file', (_event, args) => {
    return writeFamilyCardPDF(args);
  });
  ipcMain.handle('files:write-business-pdf-file', (_event, args) => {
    return writeBusinessCardPDF(args);
  });
  ipcMain.handle('files:write-club-pdf-file', (_event, args) => {
    return writeClubCardPDF(args);
  });
  ipcMain.handle('files:read-legacy-file', (_event, args) => {
    return readLegacyCalendarFile(args);
  });
}
