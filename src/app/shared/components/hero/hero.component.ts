import { Component, input } from '@angular/core';
import { HeroHeightDirective } from './directives/hero-height.directive';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ NgOptimizedImage ],
  hostDirectives: [
    { directive: HeroHeightDirective, inputs: ['heightInput'] },
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  backgroundImage = input.required<string>();
  backgroundColor = input.required<string>();
}
