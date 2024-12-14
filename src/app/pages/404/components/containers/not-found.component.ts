import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Theme, ThemeService } from '@shared/services/theme.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  private themeService = inject(ThemeService).changeTheme(Theme.WHITE);
}
