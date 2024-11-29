import { Component, input } from '@angular/core';
import { Post } from '@core/models/post.model';
import { PostTemplate } from '@shared/templates/post/post.component';

@Component({
  selector: 'app-latest-posts',
  standalone: true,
  imports: [ PostTemplate ],
  templateUrl: './latest-posts.component.html',
  styleUrl: './latest-posts.component.css'
})
export class LatestPostsComponent {
  posts = input.required<Post[]>();
}
