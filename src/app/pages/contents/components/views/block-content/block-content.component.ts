import { Component, computed, input, signal } from '@angular/core';
import { HighlightedContents } from '@contents/components/container/contents.component';
import { BlockComponent } from './block/block.component';

@Component({
  selector: 'app-block-content',
  standalone: true,
  imports: [ BlockComponent ],
  templateUrl: './block-content.component.html',
  styleUrl: './block-content.component.css'
})
export class BlockContentComponent {
  blockContent = input.required<HighlightedContents[]>();
  isLoading = input<boolean>();

  placeholderLength = input<number>(4);
  placeholderArray = computed(() => Array.from({ length: this.placeholderLength() }));
  placeholderShortPosts = signal(Array.from({ length: 4 }));
}
