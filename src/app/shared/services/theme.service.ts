import { computed, Injectable, signal, Signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor() { }

  private themePage: WritableSignal<Theme> = signal(Theme.HOME);
  themePage$: Signal<Theme> = computed(() => this.themePage());

  changeTheme(theme: Theme): void{
    this.themePage.update(val => val = theme);
  }
}

export enum Theme{
  HOME = 'home',
  PODNERD = 'podnerd',
  WHITE = 'white'
}