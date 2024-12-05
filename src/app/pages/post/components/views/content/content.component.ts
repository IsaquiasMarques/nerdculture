import { Component, computed, input } from '@angular/core';
import { Post } from '@core/models/post.model';
import { PostTemplate } from '@shared/templates/post/post.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ PostTemplate ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  content = input.required<string>();
  excludePost = input.required<number>();
  latestPosts = input.required<Post[]>();
  dimentions = input<string[]>(['w-[278px]', 'xs:w-[300px]'])
  filteredPosts = computed(() => this.latestPosts().filter(p => p.id !== this.excludePost()));
}
