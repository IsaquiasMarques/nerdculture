import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@app-components/static/footer/footer.component';
import { HeaderComponent } from '@app-components/static/header/header.component';
import { Theme, ThemeService } from '@shared/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  themeService = inject(ThemeService);
  theme = Theme;
}