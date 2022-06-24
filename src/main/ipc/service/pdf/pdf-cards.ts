/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-duplicates */
/* eslint-disable new-cap */

import sortEvents from '../../../services/sort-calendar-events';
import { CardModel } from '../../../models/calendar-model';

const jsPDF = require('jspdf');
require('jspdf-autotable');

const headers = ['Name', 'Date', 'Type'];

export function familyCardsPDF(familyCards: CardModel[]) {
  const doc = new jsPDF.jsPDF({
    format: 'letter',
  });

  let page = 0;

  // Find Amount of Pages
  let pages = 0;
  for (let i = 0; i < familyCards.length; i += 1) {
    if (familyCards[i].calendarEvents.length < 23) {
      pages += 1;
    } else {
      pages += 2;
    }
  }

  for (let x = 0; x < familyCards.length; x += 1) {
    page += 1;
    const family = familyCards[x];
    const table = sortEvents(family.calendarEvents);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text('FAMILY CARD', 87, 20);

    // Cells
    doc.line(65, 30, 65, 73);
    doc.line(181, 30, 181, 73);
    doc.line(65, 30, 181, 30);
    doc.line(65, 37, 181, 37);
    doc.line(65, 44, 181, 44);
    doc.line(65, 51, 181, 51);
    doc.line(65, 58, 181, 58);
    doc.line(65, 66, 181, 66);
    doc.line(65, 73, 181, 73);

    // Headers
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    doc.text('Family Name', 35, 35);
    doc.text('Name', 35, 42);
    doc.text('Address', 35, 49);
    doc.text('City, Prov, Code', 35, 56);
    doc.text('Home Phone', 35, 63);
    doc.text('Work Phone', 35, 70);

    // Info
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`${family.name}`, 68, 35);
    if (family.contacts[1] !== undefined) {
      doc.text(
        `${family.contacts[0].firstName} ${family.contacts[0].lastName} & ${family.contacts[1].firstName} ${family.contacts[1].lastName}`,
        68,
        42
      );
    } else {
      doc.text(
        `${family.contacts[0].firstName} ${family.contacts[0].lastName}`,
        68,
        42
      );
    }
    doc.text(`${family.address.addressLine}`, 68, 49);
    doc.text(
      `${family.address.city.toUpperCase()}, ${family.address.province.toUpperCase()}, ${family.address.postalCode.toUpperCase()}`,
      68,
      56
    );
    if (family.contactDetails.homePhone) {
      doc.text(
        `${family.contactDetails.homePhone.replace(
          /(\d{3})(\d{3})(\d{4})/,
          '$1-$2-$3'
        )}`,
        68,
        63
      );
    }
    if (family.contactDetails.workPhone) {
      doc.text(
        `${family.contactDetails.workPhone.replace(
          /(\d{3})(\d{3})(\d{4})/,
          '$1-$2-$3'
        )}`,
        68,
        70
      );
    }

    // Calendars
    doc.text('Calendars:', 35, 82);
    doc.text(`${family.order.amountOfCalendarsPurchased}`, 59, 82);
    doc.line(55, 78, 65, 78);
    doc.line(55, 84, 65, 84);
    doc.line(55, 78, 55, 84);
    doc.line(65, 78, 65, 84);
    doc.text('Paid:', 150, 82);
    doc.line(159, 83, 170, 83);

    const tableone = [];
    const tabletwo = [];
    for (let j = 0; j < family.calendarEvents.length; j += 1) {
      if (j < 23) {
        tableone.push([
          table[j].name,
          `${table[j].date.month} ${table[j].date.day}`,
          table[j].type,
        ]);
      } else {
        tabletwo.push([
          table[j].name,
          `${table[j].date.month} ${table[j].date.day}`,
          table[j].type,
        ]);
      }
    }
    const optionsone = {
      startX: 35,
      startY: 87,
    };
    doc.autoTable(headers, tableone, optionsone);
    doc.text(`Page ${page} of ${pages}`, 25, 263);
    if (family.calendarEvents.length < 23) {
      const shift = 172;
      doc.line(155, 79 + shift, 181, 79 + shift);
      doc.line(155, 83 + shift, 181, 83 + shift);
      doc.line(155, 79 + shift, 155, 83 + shift);
      doc.line(174, 79 + shift, 174, 83 + shift);
      doc.line(181, 79 + shift, 181, 83 + shift);
      doc.setFontSize(8);
      doc.text('No Changes', 156, 82 + shift);
      doc.setFontSize(10);
      doc.text(`${family.name} Family - Page 1 of 1`, 190, 263, {
        align: 'right',
      });
    } else {
      doc.text(`${family.name} Family - Page 1 of 2`, 190, 263, {
        align: 'right',
      });
      page += 1;
      doc.addPage();
      const optionstwo = {
        startX: 35,
        startY: 30,
      };
      doc.autoTable(headers, tabletwo, optionstwo);
      const shift = 172;
      doc.line(155, 79 + shift, 181, 79 + shift);
      doc.line(155, 83 + shift, 181, 83 + shift);
      doc.line(155, 79 + shift, 155, 83 + shift);
      doc.line(174, 79 + shift, 174, 83 + shift);
      doc.line(181, 79 + shift, 181, 83 + shift);
      doc.setFontSize(8);
      doc.text('No Changes', 156, 82 + shift);
      doc.setFontSize(10);
      doc.text(`Page ${page} of ${pages}`, 25, 263);
      doc.text(`${family.name} Family - Page 2 of 2`, 190, 263, {
        align: 'right',
      });
    }

    if (x !== familyCards.length - 1) {
      doc.addPage();
    }
  }

  return doc.output();
}

export function businessCardsPDF(familyCards: CardModel[]) {
  const doc = new jsPDF.jsPDF({
    format: 'letter',
  });

  let page = 0;

  // Find Amount of Pages
  let pages = 0;
  for (let i = 0; i < familyCards.length; i += 1) {
    if (familyCards[i].calendarEvents.length < 23) {
      pages += 1;
    } else {
      pages += 2;
    }
  }

  for (let x = 0; x < familyCards.length; x += 1) {
    page += 1;
    const family = familyCards[x];
    const table = sortEvents(family.calendarEvents);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text('BUSINESS CARD', 87, 20);

    // Cells
    doc.line(65, 30, 65, 73);
    doc.line(181, 30, 181, 73);
    doc.line(65, 30, 181, 30);
    doc.line(65, 37, 181, 37);
    doc.line(65, 44, 181, 44);
    doc.line(65, 51, 181, 51);
    doc.line(65, 58, 181, 58);
    doc.line(65, 66, 181, 66);
    doc.line(65, 73, 181, 73);

    // Headers
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    doc.text('Business Name', 35, 35);
    doc.text('Name', 35, 42);
    doc.text('Address', 35, 49);
    doc.text('City, Prov, Code', 35, 56);
    doc.text('Home Phone', 35, 63);
    doc.text('Work Phone', 35, 70);

    // Info
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`${family.name}`, 68, 35);
    if (family.contacts[1] !== undefined) {
      doc.text(
        `${family.contacts[0].firstName} ${family.contacts[0].lastName} & ${family.contacts[1].firstName} ${family.contacts[1].lastName}`,
        68,
        42
      );
    } else {
      doc.text(
        `${family.contacts[0].firstName} ${family.contacts[0].lastName}`,
        68,
        42
      );
    }
    doc.text(`${family.address.addressLine}`, 68, 49);
    doc.text(
      `${family.address.city.toUpperCase()}, ${family.address.province.toUpperCase()}, ${family.address.postalCode.toUpperCase()}`,
      68,
      56
    );
    if (family.contactDetails.homePhone) {
      doc.text(
        `${family.contactDetails.homePhone.replace(
          /(\d{3})(\d{3})(\d{4})/,
          '$1-$2-$3'
        )}`,
        68,
        63
      );
    }
    if (family.contactDetails.workPhone) {
      doc.text(
        `${family.contactDetails.workPhone.replace(
          /(\d{3})(\d{3})(\d{4})/,
          '$1-$2-$3'
        )}`,
        68,
        70
      );
    }

    // Calendars
    doc.text('Calendars:', 35, 82);
    doc.text(`${family.order.amountOfCalendarsPurchased}`, 59, 82);
    doc.line(55, 78, 65, 78);
    doc.line(55, 84, 65, 84);
    doc.line(55, 78, 55, 84);
    doc.line(65, 78, 65, 84);
    doc.text('Paid:', 150, 82);
    doc.line(159, 83, 170, 83);

    const tableone = [];
    const tabletwo = [];
    for (let j = 0; j < family.calendarEvents.length; j += 1) {
      if (j < 23) {
        tableone.push([
          table[j].name,
          `${table[j].date.month} ${table[j].date.day}`,
          table[j].type,
        ]);
      } else {
        tabletwo.push([
          table[j].name,
          `${table[j].date.month} ${table[j].date.day}`,
          table[j].type,
        ]);
      }
    }
    const optionsone = {
      startX: 35,
      startY: 87,
    };
    doc.autoTable(headers, tableone, optionsone);
    doc.text(`Page ${page} of ${pages}`, 25, 263);
    if (family.calendarEvents.length < 23) {
      const shift = 172;
      doc.line(155, 79 + shift, 181, 79 + shift);
      doc.line(155, 83 + shift, 181, 83 + shift);
      doc.line(155, 79 + shift, 155, 83 + shift);
      doc.line(174, 79 + shift, 174, 83 + shift);
      doc.line(181, 79 + shift, 181, 83 + shift);
      doc.setFontSize(8);
      doc.text('No Changes', 156, 82 + shift);
      doc.setFontSize(10);
      doc.text(`${family.name} Business - Page 1 of 1`, 190, 263, {
        align: 'right',
      });
    } else {
      doc.text(`${family.name} Business - Page 1 of 2`, 190, 263, {
        align: 'right',
      });
      page += 1;
      doc.addPage();
      const optionstwo = {
        startX: 35,
        startY: 30,
      };
      doc.autoTable(headers, tabletwo, optionstwo);
      const shift = 172;
      doc.line(155, 79 + shift, 181, 79 + shift);
      doc.line(155, 83 + shift, 181, 83 + shift);
      doc.line(155, 79 + shift, 155, 83 + shift);
      doc.line(174, 79 + shift, 174, 83 + shift);
      doc.line(181, 79 + shift, 181, 83 + shift);
      doc.setFontSize(8);
      doc.text('No Changes', 156, 82 + shift);
      doc.setFontSize(10);
      doc.text(`Page ${page} of ${pages}`, 25, 263);
      doc.text(`${family.name} Business - Page 2 of 2`, 190, 263, {
        align: 'right',
      });
    }

    if (x !== familyCards.length - 1) {
      doc.addPage();
    }
  }

  return doc.output();
}

export function clubCardsPDF(familyCards: CardModel[]) {
  const doc = new jsPDF.jsPDF({
    format: 'letter',
  });

  let page = 0;

  // Find Amount of Pages
  let pages = 0;
  for (let i = 0; i < familyCards.length; i += 1) {
    if (familyCards[i].calendarEvents.length < 23) {
      pages += 1;
    } else {
      pages += 2;
    }
  }

  for (let x = 0; x < familyCards.length; x += 1) {
    page += 1;
    const family = familyCards[x];
    const table = sortEvents(family.calendarEvents);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text('CLUB CARD', 87, 20);

    // Cells
    doc.line(65, 30, 65, 73);
    doc.line(181, 30, 181, 73);
    doc.line(65, 30, 181, 30);
    doc.line(65, 37, 181, 37);
    doc.line(65, 44, 181, 44);
    doc.line(65, 51, 181, 51);
    doc.line(65, 58, 181, 58);
    doc.line(65, 66, 181, 66);
    doc.line(65, 73, 181, 73);

    // Headers
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    doc.text('Business Name', 35, 35);
    doc.text('Name', 35, 42);
    doc.text('Address', 35, 49);
    doc.text('City, Prov, Code', 35, 56);
    doc.text('Home Phone', 35, 63);
    doc.text('Work Phone', 35, 70);

    // Info
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`${family.name}`, 68, 35);
    if (family.contacts[1] !== undefined) {
      doc.text(
        `${family.contacts[0].firstName} ${family.contacts[0].lastName} & ${family.contacts[1].firstName} ${family.contacts[1].lastName}`,
        68,
        42
      );
    } else {
      doc.text(
        `${family.contacts[0].firstName} ${family.contacts[0].lastName}`,
        68,
        42
      );
    }
    doc.text(`${family.address.addressLine}`, 68, 49);
    doc.text(
      `${family.address.city.toUpperCase()}, ${family.address.province.toUpperCase()}, ${family.address.postalCode.toUpperCase()}`,
      68,
      56
    );
    if (family.contactDetails.homePhone) {
      doc.text(
        `${family.contactDetails.homePhone.replace(
          /(\d{3})(\d{3})(\d{4})/,
          '$1-$2-$3'
        )}`,
        68,
        63
      );
    }
    if (family.contactDetails.workPhone) {
      doc.text(
        `${family.contactDetails.workPhone.replace(
          /(\d{3})(\d{3})(\d{4})/,
          '$1-$2-$3'
        )}`,
        68,
        70
      );
    }

    // Calendars
    doc.text('Calendars:', 35, 82);
    doc.text(`${family.order.amountOfCalendarsPurchased}`, 59, 82);
    doc.line(55, 78, 65, 78);
    doc.line(55, 84, 65, 84);
    doc.line(55, 78, 55, 84);
    doc.line(65, 78, 65, 84);
    doc.text('Paid:', 150, 82);
    doc.line(159, 83, 170, 83);

    const tableone = [];
    const tabletwo = [];
    for (let j = 0; j < family.calendarEvents.length; j += 1) {
      if (j < 23) {
        tableone.push([
          table[j].name,
          `${table[j].date.month} ${table[j].date.day}`,
          table[j].type,
        ]);
      } else {
        tabletwo.push([
          table[j].name,
          `${table[j].date.month} ${table[j].date.day}`,
          table[j].type,
        ]);
      }
    }
    const optionsone = {
      startX: 35,
      startY: 87,
    };
    doc.autoTable(headers, tableone, optionsone);
    doc.text(`Page ${page} of ${pages}`, 25, 263);
    if (family.calendarEvents.length < 23) {
      const shift = 172;
      doc.line(155, 79 + shift, 181, 79 + shift);
      doc.line(155, 83 + shift, 181, 83 + shift);
      doc.line(155, 79 + shift, 155, 83 + shift);
      doc.line(174, 79 + shift, 174, 83 + shift);
      doc.line(181, 79 + shift, 181, 83 + shift);
      doc.setFontSize(8);
      doc.text('No Changes', 156, 82 + shift);
      doc.setFontSize(10);
      doc.text(`${family.name} Club - Page 1 of 1`, 190, 263, {
        align: 'right',
      });
    } else {
      doc.text(`${family.name} Club - Page 1 of 2`, 190, 263, {
        align: 'right',
      });
      page += 1;
      doc.addPage();
      const optionstwo = {
        startX: 35,
        startY: 30,
      };
      doc.autoTable(headers, tabletwo, optionstwo);
      const shift = 172;
      doc.line(155, 79 + shift, 181, 79 + shift);
      doc.line(155, 83 + shift, 181, 83 + shift);
      doc.line(155, 79 + shift, 155, 83 + shift);
      doc.line(174, 79 + shift, 174, 83 + shift);
      doc.line(181, 79 + shift, 181, 83 + shift);
      doc.setFontSize(8);
      doc.text('No Changes', 156, 82 + shift);
      doc.setFontSize(10);
      doc.text(`Page ${page} of ${pages}`, 25, 263);
      doc.text(`${family.name} Club - Page 2 of 2`, 190, 263, {
        align: 'right',
      });
    }

    if (x !== familyCards.length - 1) {
      doc.addPage();
    }
  }

  return doc.output();
}
