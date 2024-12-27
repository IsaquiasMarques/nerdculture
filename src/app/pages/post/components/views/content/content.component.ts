import { isPlatformBrowser } from '@angular/common';
import { Component, computed, Inject, input, PLATFORM_ID, Signal } from '@angular/core';
import { Post } from '@core/models/post.model';
import { SafeArticleContentPipe } from '@shared/pipes/safe-article-content.pipe';
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ SafeArticleContentPipe ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

  incomingThePost = input.required<Post[]>(); 
  thePost: Signal<Post> = computed(() => this.incomingThePost()[0]);

  isLoading = input<boolean>(false);
  contentPlaceholderGroupLength = input<number>(8);
  contentPlaceholderGroupArray = computed(() => Array.from({ length: this.contentPlaceholderGroupLength() }));

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }
  
  shareOnFacebook(){
    if(isPlatformBrowser(this.platformId)){
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}%2F&amp;src=sdkpreparse`, '_blank')
    }
  }

  shareOnTwitter(){
    if(isPlatformBrowser(this.platformId)){
      window.open(`https://twitter.com/intent/tweet?original_referer=${window.location.origin}&text=${this.thePost().title + ' ' +window.location.href}&url=${window.location.href}`, '_blank');
    }
  }

  shareOnWhatsapp(){
    if(isPlatformBrowser(this.platformId)){
      window.open(`https://api.whatsapp.com/send?text=${this.thePost().title + ' ' +window.location.href}`, '_blank');
    }
  }

  shareOnLinkedin(){
    if(isPlatformBrowser(this.platformId)){
      window.open(`https://www.linkedin.com/sharing/share-offsite/?mini=true&url=${window.location.href}`, '_blank');
    }
  }

}