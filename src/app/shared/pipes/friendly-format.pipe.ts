import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyFormat',
  standalone: true
})
export class FriendlyFormatPipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    const day = date.getDate();
    const year = date.getFullYear();

    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const month = months[date.getMonth()];

    return `${ day }, ${ month } de ${ year }`;

  }

}
