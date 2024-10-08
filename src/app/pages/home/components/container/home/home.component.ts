import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '@shared/components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ HeroComponent, RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
