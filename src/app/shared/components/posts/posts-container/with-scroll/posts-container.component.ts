import { Component, input } from '@angular/core';
import { Post } from '@core/models/post.model';
import { PostTemplate } from '@shared/templates/post/post.component';

@Component({
  selector: 'app-posts-container',
  standalone: true,
  imports: [ PostTemplate ],
  templateUrl: './posts-container.component.html',
  styleUrl: './posts-container.component.css'
})
export class PostsContainerComponent {
  posts = input.required<Post[]>();
  dimentions = input<string[]>(['w-full', 'max-w-[18.75rem]'])
}
