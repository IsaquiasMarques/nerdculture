import { NgClass } from '@angular/common';
import { Component, ElementRef, input, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollerFunctionalities } from '@core/classes/scroller.class';
import { Post, PostCategory } from '@core/models/post.model';

@Component({
  selector: 'app-posts-slider',
  standalone: true,
  imports: [ NgClass, RouterLink ],
  templateUrl: './posts-slider.component.html',
  styleUrl: './posts-slider.component.css'
})
export class PostsSliderComponent extends ScrollerFunctionalities {
  
  override withaddingSpacing: boolean = false;
  sliderElementRef = viewChild<ElementRef<HTMLElement>>('sliderElementRef');
  HostLimitedContainerElementRef = viewChild<ElementRef<HTMLElement>>('limitedContainerElementRef');

  posts = input.required<Post[]>();
  category = input.required<PostCategory>()

  protected override bootstrap(): void {
    this.scrollerElementRef = this.sliderElementRef()!;
    // this.limitedContainerElementRef = this.HostLimitedContainerElementRef()!;
    this.itemsArray = this.posts;
  }

}
