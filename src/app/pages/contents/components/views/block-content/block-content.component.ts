import { Component, input } from '@angular/core';
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
}
