import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coordinateFormatter'
})
export class CoordinateFormatterPipe implements PipeTransform {
  transform(value: number, positiveSuffix: string, negativeSuffix: string): string {

    let suffix = '';

    if (value >= 0) {
      suffix = positiveSuffix;
    } else if (value < 0) {
      value = Math.abs(value);
      suffix = negativeSuffix;
    }

    return this.longLatToDMS(value) + ' ' + suffix;
  }

  private longLatToDMS(degrees: number) {
    const hours = Math.floor(degrees); // we don't need to worry about negative numbers
    degrees -= hours;
    degrees *= 60;
    const minutes = Math.floor(degrees); // we don't need to worry about negative numbers
    degrees -= minutes;
    degrees *= 60;
    const seconds = Math.floor(degrees);

    return `${hours}° ${minutes}' ${seconds}''`;
  }
}
