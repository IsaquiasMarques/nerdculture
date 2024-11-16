import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frendlyPodcastDateFormat',
  standalone: true
})
export class FrendlyPodcastDateFormatPipe implements PipeTransform {

  transform(value: string): string {
    // Dividir a string de data no formato `d/m/Y`
    const [day, month, year] = value.split('/').map(Number);

    // Criar um novo objeto Date com os valores corretos (mês é 0-indexado)
    const date = new Date(year, month - 1, day);

    // Validar se a data é válida
    if (isNaN(date.getTime())) {
        throw new Error("Data inválida");
    }

    const dayWithZero = this.addZeroDigit(date.getDate());
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const monthName = months[date.getMonth()];

    return `${dayWithZero}, ${monthName} de ${date.getFullYear()}`;

  }

  addZeroDigit(day: number): string {
      return day < 10 ? `0${day}` : day.toString();
  }

}
