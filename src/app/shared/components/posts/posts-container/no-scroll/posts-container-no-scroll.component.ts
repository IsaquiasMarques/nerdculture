import { Component, computed, input } from '@angular/core';
import { Post, PostCategory } from '@core/models/post.model';
import { CardDimentionsDirective } from '@shared/templates/post/directive/card-dimentions.directive';
import { PostTemplate } from '@shared/templates/post/post.component';

@Component({
  selector: 'app-posts-container-no-scroll',
  standalone: true,
  imports: [ PostTemplate, CardDimentionsDirective ],
  templateUrl: './posts-container-no-scroll.component.html',
  styleUrl: './posts-container-no-scroll.component.css'
})
export class PostsContainerNoScrollComponent {
  posts = input.required<Post[]>();
  theCategory = input<PostCategory>();
  dimentions = input<string[]>(['w-full', 'max-w-[18.75rem]'])
  
  isLoading = input<boolean>(false);
  placeholderLength = input<number>(8);
  placeholderArray = computed(() => Array.from({ length: this.placeholderLength() }));
}
