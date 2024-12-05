import { Component, input } from '@angular/core';
import { PostCategory } from '@core/models/post.model';
import { FriendlyFormatPipe } from '@shared/pipes/friendly-format.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ FriendlyFormatPipe ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  title = input.required<string>();
  excerpt = input.required<string>();
  categories = input.required<PostCategory[]>();
  author = input.required<string>();
  createdAt = input.required<string>();
  hero = input.required<string>();
}
