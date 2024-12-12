import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '@core/models/post.model';
import { CardDimentionsDirective } from '@shared/templates/post/directive/card-dimentions.directive';
import { PostTemplate } from '@shared/templates/post/post.component';

@Component({
  selector: 'app-posts-container',
  standalone: true,
  imports: [ PostTemplate, RouterLink, CardDimentionsDirective ],
  templateUrl: './posts-container.component.html',
  styleUrl: './posts-container.component.css'
})
export class PostsContainerComponent {
  posts = input.required<Post[]>();
  dimentions = input<string[]>(['w-full', 'max-w-[18.75rem]']);
  
  isLoading = input<boolean>(false);
  placeholderLength = input<number>(4);
  placeholderArray = computed(() => Array.from({ length: this.placeholderLength() }));
}
