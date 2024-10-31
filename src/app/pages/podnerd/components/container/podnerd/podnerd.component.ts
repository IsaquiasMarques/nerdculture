import { Component, inject } from '@angular/core';
import { Theme, ThemeService } from '@shared/services/theme.service';

@Component({
  selector: 'app-podnerd',
  standalone: true,
  imports: [],
  templateUrl: './podnerd.component.html',
  styleUrl: './podnerd.component.css'
})
export class PodnerdComponent {
  theme = Theme;
  private themeService = inject(ThemeService).changeTheme(this.theme.PODNERD);
}
