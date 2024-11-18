import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post, PostCategory } from '@core/models/post.model';
import { PostsContainerComponent } from '@shared/components/posts/posts-container/with-scroll/posts-container.component';

@Component({
  selector: 'app-latest-posts',
  standalone: true,
  imports: [ PostsContainerComponent, RouterLink ],
  templateUrl: './latest-posts.component.html',
  styleUrl: './latest-posts.component.css'
})
export class LatestPostsComponent {
  posts = input.required<Post[]>();
  categories = input.required<PostCategory[]>();
}
