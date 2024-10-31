import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceCommaByDot',
  standalone: true
})
export class DecimalAuxPipe implements PipeTransform {

  transform(value: string | null): string | null {
    if(!value) return null;
    return value.toString().replace(',', '.');
  }

}
