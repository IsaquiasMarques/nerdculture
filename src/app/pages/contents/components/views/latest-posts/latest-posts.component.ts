import { Component, computed, input } from '@angular/core';
import { LoaderExtender } from '@core/classes/loader-extender.class';
import { Post } from '@core/models/post.model';
import { PostTemplate } from '@shared/templates/post/post.component';

@Component({
  selector: 'app-latest-posts',
  standalone: true,
  imports: [ PostTemplate ],
  templateUrl: './latest-posts.component.html',
  styleUrl: './latest-posts.component.css'
})
export class LatestPostsComponent extends LoaderExtender {
  posts = input.required<Post[]>();
  dimentions = input<string[]>(['w-[278px]', 'xs:w-[300px]'])

  placeholderLength = input<number>(9);
  placeholderArray = computed(() => Array.from({ length: this.placeholderLength() }));
  
}
