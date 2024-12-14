import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderExtender } from '@core/classes/loader-extender.class';
import { Post, PostCategory } from '@core/models/post.model';
import { PostsContainerComponent } from '@shared/components/posts/posts-container/with-scroll/posts-container.component';

@Component({
  selector: 'app-latest-posts',
  standalone: true,
  imports: [ PostsContainerComponent, RouterLink, NgOptimizedImage ],
  templateUrl: './latest-posts.component.html',
  styleUrl: './latest-posts.component.css'
})
export class LatestPostsComponent extends LoaderExtender {
  posts = input.required<Post[]>();
  categories = input.required<PostCategory[]>();

  placeholderLength = input<number>(9);
  placeholderArray = computed(() => Array.from({ length: this.placeholderLength() }));
}
