import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any): any {
    const stringValue: string = value.toString();
    if (!stringValue) {
      return '';
    }

    return stringValue[0].toUpperCase() + stringValue.slice(1);
  }

}
