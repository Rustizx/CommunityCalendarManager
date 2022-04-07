import { ipcMain } from 'electron';
import {
  BusinessCardModel,
  CalendarEventModel,
  CalendarModel,
  FamilyCardModel,
  ImportCalendarModel,
} from 'renderer/models/redux-models';
import { LegacyFamilyModels } from 'renderer/models/legacy-models';
import { defaultBusiness, defaultClub, defaultFamily } from './models/defaults';
import { ReadFileType, WriteFileType } from './types/file-manager-types';
import { EncryptedFileType, encrypt, decrypt } from './service/encryption';
import { familyCardsPDF, businessCardsPDF, clubCardsPDF } from './service/pdf';

const fs = require('fs');

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

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

function readLegacyCalendarFile(fileInfo: ReadFileType): ImportCalendarModel {
  try {
    const data: LegacyFamilyModels[] = JSON.parse(
      fs.readFileSync(fileInfo.path, 'utf8')
    );
    const familyCards: FamilyCardModel[] = [];
    const businessCards: BusinessCardModel[] = [];

    for (let x = 0; x < data.length; x += 1) {
      const cal: CalendarEventModel[] = [];
      for (let y = 0; y < data[x].calendar.length; y += 1) {
        cal.push({
          name: data[x].calendar[y].name,
          type: data[x].calendar[y].type,
          date: {
            month: `${
              monthNames[parseInt(data[x].calendar[y].date.slice(5, 7), 10) - 1]
            }`,
            day: `${data[x].calendar[y].date.slice(8, 10)}`,
          },
        });
      }
      if (data[x].business !== undefined && data[x].business === true) {
        businessCards.push({
          id: data[x].id,
          business_name: data[x].familyname,
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
          family_name: data[x].familyname,
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
      defaultFamilyCard: defaultFamily,
      familyCards,
      defaultBusinessCard: defaultBusiness,
      businessCards,
      defaultClubCard: defaultClub,
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

function writeFamilyCardPDF(fileInfo: WriteFileType): boolean {
  try {
    const { familyCards } = fileInfo.calendar;

    const pdfData = familyCardsPDF(familyCards);

    fs.writeFileSync(fileInfo.path, pdfData, { encoding: 'utf8' });
    return true;
  } catch (err) {
    return false;
  }
}

function writeBusinessCardPDF(fileInfo: WriteFileType): boolean {
  try {
    const { businessCards } = fileInfo.calendar;

    const pdfData = businessCardsPDF(businessCards);

    fs.writeFileSync(fileInfo.path, pdfData, { encoding: 'utf8' });
    return true;
  } catch (err) {
    return false;
  }
}

function writeClubCardPDF(fileInfo: WriteFileType): boolean {
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
