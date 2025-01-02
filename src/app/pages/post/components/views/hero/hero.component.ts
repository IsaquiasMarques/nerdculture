import { Component, computed, input, Signal } from '@angular/core';
import { Post, PostCategory } from '@core/models/post.model';
import { FriendlyFormatPipe } from '@shared/pipes/friendly-format.pipe';
import { SafeArticleContentPipe } from '@shared/pipes/safe-article-content.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ FriendlyFormatPipe, SafeArticleContentPipe ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  incomingThePost = input.required<Post[]>(); 
  thePost: Signal<Post> = computed(() => this.incomingThePost()[0]);

  isLoading = input<boolean>();
}
