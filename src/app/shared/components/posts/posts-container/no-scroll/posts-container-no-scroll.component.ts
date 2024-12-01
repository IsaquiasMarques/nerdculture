import { Component, input } from '@angular/core';
import { Post } from '@core/models/post.model';
import { PostTemplate } from '@shared/templates/post/post.component';

@Component({
  selector: 'app-posts-container-no-scroll',
  standalone: true,
  imports: [ PostTemplate ],
  templateUrl: './posts-container-no-scroll.component.html',
  styleUrl: './posts-container-no-scroll.component.css'
})
export class PostsContainerNoScrollComponent {
  posts = input.required<Post[]>();
  dimentions = input<string[]>(['w-full', 'max-w-[18.75rem]'])
}
