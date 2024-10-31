import { Component } from '@angular/core';
import { HeroComponent } from '@shared/components/hero/hero.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    HeroComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}
