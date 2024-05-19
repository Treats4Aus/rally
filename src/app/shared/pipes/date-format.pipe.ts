import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let now = new Date();
    let dateValue = new Date(value);
    if (dateValue > now) {
      return dateValue.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false});
    } else {
      let delta = (now.getTime() - value) / 1000;
      let deltaValue = 0;
      let deltaMeasurement = '';
      if (delta < 60) {
        return 'Just now';
      } else if (delta < 60 * 60) {
        deltaValue = delta / 60;
        deltaMeasurement = 'minute';
      } else if (delta < 24 * 60 * 60) {
        deltaValue = delta / (60 * 60);
        deltaMeasurement = 'hour';
      } else if (delta < 365 * 24 * 60 * 60) {
        deltaValue = delta / (24 * 60 * 60);
        deltaMeasurement = 'day';
      } else {
        deltaValue = delta / (365 * 24 * 60 * 60);
        deltaMeasurement = 'year';
      }
      deltaValue = Math.floor(deltaValue);
      if (deltaValue !== 1) {
        deltaMeasurement += 's';
      }
      return `${deltaValue} ${deltaMeasurement} ago`;
    }
  }

}
