
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Post } from '@core/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class MetaTagService {

  private url: string = '';

  constructor(
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    if(isPlatformBrowser(this.platformId)){
      this.url = window.location.href;
    }
  }

  addMetaTags(metaTag: MetaTag): void{

    this.meta.addTag({ name: 'og:title', content: metaTag.title });
    this.meta.addTag({ name: 'og:description', content: metaTag.description });
    this.meta.addTag({ name: 'og:image', content: metaTag.image });
    this.meta.addTag({ name: 'og:url', content: metaTag.url });

    this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({ name: 'twitter:title', content: metaTag.title });
    this.meta.addTag({ name: 'twitter:description', content: metaTag.description });
    this.meta.addTag({ name: 'twitter:image', content: metaTag.image });
    this.meta.addTag({ name: 'twitter:url', content: metaTag.url });

  }

  addPostSocialMediaMetaTags(thePost: Post[]): void{

    this.meta.addTag({ name: 'og:title', content: thePost[0].title });
    this.meta.addTag({ name: 'og:description', content: thePost[0].excerpt });
    this.meta.addTag({ name: 'og:image', content: thePost[0].image.medium });
    this.meta.addTag({ name: 'og:url', content: this.url });

    this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({ name: 'twitter:title', content: thePost[0].title });
    this.meta.addTag({ name: 'twitter:description', content: thePost[0].excerpt });
    this.meta.addTag({ name: 'twitter:image', content: thePost[0].image.medium });
    this.meta.addTag({ name: 'twitter:url', content: this.url });
  }

}

export interface MetaTag{
    title: string,
    description: string,
    image: string,
    url: string
}