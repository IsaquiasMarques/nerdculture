import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post, PostCategory } from '@core/models/post.model';
import { FriendlyFormatPipe } from '@shared/pipes/friendly-format.pipe';
import { CardDimentionsDirective } from './directive/card-dimentions.directive';
import { JsonPipe, NgClass, NgOptimizedImage } from '@angular/common';
import { SafeArticleContentPipe } from '@shared/pipes/safe-article-content.pipe';

@Component({
  selector: 'app-post-template',
  standalone: true,
  imports: [ RouterLink, FriendlyFormatPipe, SafeArticleContentPipe, CardDimentionsDirective, NgOptimizedImage ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostTemplate {
  post = input.required<Post>();
  theCategory = input<PostCategory>();
  responsive = input.required<boolean>();
  dimentions = input.required<string[]>();

  isLoading = input<boolean>(false);

  transformedCategory = computed(() => {
    const uniqueCategories = new Map<string, PostCategory>();
    [this.theCategory(), ...this.post().categories].forEach(category => {
      if(category && !uniqueCategories.has(category.slug)){
        uniqueCategories.set(category.slug, category)
      }
    })

    return Array.from(uniqueCategories.values())
  });
  
  templateSize = input<'long' | 'short' | 'mixed'>('long');
}
