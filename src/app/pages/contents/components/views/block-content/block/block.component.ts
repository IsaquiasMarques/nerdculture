import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HighlightedContents } from '@contents/components/container/contents.component';
import { PostTemplate } from '@shared/templates/post/post.component';

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [ RouterLink, PostTemplate ],
  templateUrl: './block.component.html',
  styleUrl: './block.component.css'
})
export class BlockComponent {
  block = input.required<HighlightedContents>();

  highlightedPost = computed(() => this.block().posts().shift()!);
  remainingPosts = computed(() => this.block().posts().slice(0));

}
