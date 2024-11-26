import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID, Renderer2, signal, Signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Theme, ThemeService } from '@shared/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, NgClass ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer2: Renderer2
  ){}
  
  theme = Theme;
  currentTheme$ = inject(ThemeService).themePage$;
  dropdownMenuOpen: WritableSignal<boolean> = signal(false);

  closeDropdownMenu(): void{
    this.dropdownMenuOpen.update(val => val = false);
    this.enableScroll();
  }

  openDropdownMenu(): void{
    this.dropdownMenuOpen.update(val => val = true);
    this.disableScroll();
  }

  toggleDropdownMenu(): void{
    if(this.dropdownMenuOpen()){
      this.closeDropdownMenu();
    } else {
      this.openDropdownMenu();
    }
  }

  disableScroll(): void{
    this.renderer2.setStyle(document.body, 'height', '90vh');
    this.renderer2.setStyle(document.body, 'overflow', 'hidden');
  }

  enableScroll(): void{
    this.renderer2.removeStyle(document.body, 'height');
    this.renderer2.removeStyle(document.body, 'overflow');
  }

}
