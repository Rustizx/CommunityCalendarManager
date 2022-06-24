/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-duplicates */
/* eslint-disable new-cap */

import CalendarModel from '../../../models/calendar-model';

const jsPDF = require('jspdf');
require('jspdf-autotable');

const maxRows = 10;
const maxColumns = 3;
const labelsPerPage = maxRows * maxColumns;

const xOffset = 7;
const yOffset = 18;

const boxWidth = 59;
const boxHeight = 15;

const horizontalSpacing = 14;
const verticalSpacing = 11.5;

const textSpacing = boxHeight / 4;
const labelNumberSize = 8;
const businessContactNameSpacing = 24;

interface LabelModel {
  name: string;
  phone: string;
  address1: string;
  address2: string;
  labelNumber: string;
  optionalName: string;
}

function addDashes(f: string): string {
  const f_val = f.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  return f_val;
}

export default function labelPDF(calendar: CalendarModel) {
  const doc = new jsPDF.jsPDF({
    format: 'letter',
  });
  doc.setFontSize(9);

  const labels: LabelModel[] = [];

  for (
    let clubIndex = 0;
    clubIndex < calendar.clubCards.length;
    clubIndex += 1
  ) {
    let name = '';
    if (calendar.clubCards[clubIndex].contacts.length === 2) {
      name = `${calendar.clubCards[clubIndex].contacts[1].firstName} & ${calendar.clubCards[clubIndex].contacts[0].firstName} ${calendar.clubCards[clubIndex].contacts[0].lastName}`;
    } else if (calendar.clubCards[clubIndex].contacts.length === 1) {
      name = `${calendar.clubCards[clubIndex].contacts[0].firstName} ${calendar.clubCards[clubIndex].contacts[0].lastName}`;
    }
    labels.push({
      name: `${calendar.clubCards[clubIndex].name}`,
      phone: `${addDashes(
        calendar.clubCards[clubIndex].contactDetails.homePhone
      )}`,
      address1: `${calendar.clubCards[clubIndex].address.addressLine}`,
      address2: `${calendar.clubCards[clubIndex].address.city}, ${calendar.clubCards[clubIndex].address.province}, ${calendar.clubCards[clubIndex].address.postalCode}`,
      labelNumber: `1 of 1`,
      optionalName: name,
    });
  }

  for (
    let businessIndex = 0;
    businessIndex < calendar.businessCards.length;
    businessIndex += 1
  ) {
    let name = '';
    if (calendar.businessCards[businessIndex].contacts.length === 2) {
      name = `${calendar.businessCards[businessIndex].contacts[1].firstName} & ${calendar.businessCards[businessIndex].contacts[0].firstName} ${calendar.businessCards[businessIndex].contacts[0].lastName}`;
    } else if (calendar.businessCards[businessIndex].contacts.length === 1) {
      name = `${calendar.businessCards[businessIndex].contacts[0].firstName} ${calendar.businessCards[businessIndex].contacts[0].lastName}`;
    }
    labels.push({
      name: `${calendar.businessCards[businessIndex].name}`,
      phone: `${addDashes(
        calendar.businessCards[businessIndex].contactDetails.homePhone
      )}`,
      address1: `${calendar.businessCards[businessIndex].address.addressLine}`,
      address2: `${calendar.businessCards[businessIndex].address.city}, ${calendar.businessCards[businessIndex].address.province}, ${calendar.businessCards[businessIndex].address.postalCode}`,
      labelNumber: `1 of 1`,
      optionalName: name,
    });
  }

  for (
    let familyIndex = 0;
    familyIndex < calendar.familyCards.length;
    familyIndex += 1
  ) {
    for (
      let la = 0;
      la <
      parseInt(
        calendar.familyCards[familyIndex].order.amountOfCalendarsPurchased,
        10
      );
      la += 1
    ) {
      let { name } = calendar.familyCards[familyIndex];
      if (calendar.familyCards[familyIndex].contacts.length === 2) {
        name += `,${
          calendar.familyCards[familyIndex].contacts[1].firstName !== ''
            ? ` ${calendar.familyCards[familyIndex].contacts[1].firstName} &`
            : ''
        } ${calendar.familyCards[familyIndex].contacts[0].firstName}`;
      } else if (calendar.familyCards[familyIndex].contacts.length === 1) {
        name += `, ${calendar.familyCards[familyIndex].contacts[0].firstName}`;
      }
      labels.push({
        name,
        phone: `${addDashes(
          calendar.familyCards[familyIndex].contactDetails.homePhone
        )}`,
        address1: `${calendar.familyCards[familyIndex].address.addressLine}`,
        address2: `${calendar.familyCards[familyIndex].address.city}, ${calendar.familyCards[familyIndex].address.province}, ${calendar.familyCards[familyIndex].address.postalCode}`,
        labelNumber: `${la + 1} of ${
          calendar.familyCards[familyIndex].order.amountOfCalendarsPurchased
        }`,
        optionalName: '',
      });
    }
  }

  for (
    let page = 0;
    page < Math.ceil(labels.length / labelsPerPage);
    page += 1
  ) {
    for (let row = 0; row < maxRows; row += 1) {
      const y = yOffset + (boxHeight + verticalSpacing) * row;
      for (let column = 0; column < maxColumns; column += 1) {
        const x = xOffset + (boxWidth + horizontalSpacing) * column;

        const index = page * labelsPerPage + row * maxColumns + column;

        if (index < labels.length) {
          doc.setFont('helvetica', 'bold');
          doc.text(labels[index].name, x, y);
          doc.setFontSize(8);
          doc.text(
            labels[index].optionalName,
            x + businessContactNameSpacing,
            y + 1 * textSpacing
          );
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          doc.text(labels[index].phone, x, y + 1 * textSpacing);
          doc.text(labels[index].address1, x, y + 2 * textSpacing);
          doc.text(labels[index].address2, x, y + 3 * textSpacing);

          doc.text(
            labels[index].labelNumber,
            x + boxWidth - labelNumberSize,
            y + 3 * textSpacing
          );
        }
      }
    }
    doc.addPage();
  }

  return doc.output();
}
