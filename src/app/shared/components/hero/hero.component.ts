import { Component, input } from '@angular/core';
import { HeroHeightDirective } from './directives/hero-height.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  hostDirectives: [
    { directive: HeroHeightDirective, inputs: ['heightInput'] },
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  backgroundImage = input.required();
  backgroundColor = input.required();
}
