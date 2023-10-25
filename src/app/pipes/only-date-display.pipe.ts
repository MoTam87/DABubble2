import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'onlyDateDisplay'
})
export class OnlyDateDisplayPipe implements PipeTransform {

  transform(value: Timestamp | undefined): string {
    if (!value) {
      return '';
    }

    const daysOfWeek = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

    const currentDate = new Date();
    const inputDate = new Date(value.toMillis());

    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

    if (
      inputDate.getDate() === yesterday.getDate() &&
      inputDate.getMonth() === yesterday.getMonth() &&
      inputDate.getFullYear() === yesterday.getFullYear()
    ) {
      return 'gestern';
    } else {
      const dayOfWeek = daysOfWeek[inputDate.getDay()];
      const dayOfMonth = inputDate.getDate();
      const month = months[inputDate.getMonth()];

      return `${dayOfWeek}, ${dayOfMonth} ${month}`;
    }
  }

}
