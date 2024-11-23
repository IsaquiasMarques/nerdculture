import { NgClass } from '@angular/common';
import { Component, computed, input, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ RouterLink, NgClass ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  items = input.required<{ total: number, current_page: number, per_page: number }>();
  pageToRoute = input.required<string[]>();
  pages: Signal<number[]> = computed(() => {
    const { total, per_page } = this.items();
    
    if (!total || !per_page || per_page <= 0) {
      return []; // Retorna um array vazio se os valores não forem válidos
    }
    
    const totalPages = Math.ceil(total / per_page); // Calcula o número total de páginas
    return Array.from({ length: totalPages }, (_, index) => index + 1); // Cria o array de páginas
  })
}
