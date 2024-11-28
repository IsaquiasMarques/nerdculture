import { Component, ElementRef, input, viewChild } from '@angular/core';
import { HighlightedContents } from '@contents/components/container/contents.component';
import { PostsSliderComponent } from './posts-slider/posts-slider.component';
import { ScrollerFunctionalities } from '@core/classes/scroller.class';

@Component({
  selector: 'app-highlighted-categories',
  standalone: true,
  imports: [ PostsSliderComponent ],
  templateUrl: './highlighted-categories.component.html',
  styleUrl: './highlighted-categories.component.css'
})
export class HighlightedCategoriesComponent extends ScrollerFunctionalities {
  override withaddingSpacing: boolean = true;
  contents = input.required<HighlightedContents[]>();
  limitedElementRef = viewChild<ElementRef<HTMLElement>>('limitedContainerElementRef');
  scrollerContainerElementRef = viewChild<ElementRef<HTMLElement>>('scollerContainerElementRef');

  protected override bootstrap(): void {
    this.scrollerElementRef = this.scrollerContainerElementRef()!;
    this.limitedContainerElementRef = this.limitedElementRef()!;
    this.itemsArray = this.contents;
  }
}
