import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdvertisementClass } from '@core/classes/advertisement.class';
import { AdvertisementPage } from '@core/models/advertisement.model';
import { AdvertisementsComponent } from '@shared/components/advertisements/advertisements.component';
import { Theme, ThemeService } from '@shared/services/theme.service';
import { HeroComponent } from '../views/hero/hero.component';
import { Post } from '@core/models/post.model';
import { PostFacade } from '@shared/facades/post.facade';
import { ContentComponent } from '../views/content/content.component';
import { LoaderService } from '@core/services/loader.service';
import { MetaTagService } from '@shared/services/meta-tag.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ AdvertisementsComponent, HeroComponent, ContentComponent ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent extends AdvertisementClass implements OnInit {

  loaderService = inject(LoaderService);
  private metatagService = inject(MetaTagService);

  override page: AdvertisementPage = AdvertisementPage.READING;
  private themeService = inject(ThemeService).changeTheme(Theme.WHITE);
  private activatedRoute = inject(ActivatedRoute);
  private postFacade = inject(PostFacade);

  thePost: WritableSignal<Post[]> = signal([]);
  latestPosts: Signal<Post[]> = signal([]);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      const post_slug = param.get('slug');

      if(post_slug === null){
        return;
      }

      this.getThePost(post_slug)
      this.getLatestPosts();

    });
  }

  private getThePost(slug: string): void{
    this.loaderService.updateLoadingStatus('post', true);
    this.postFacade.getThePost(slug).subscribe({
      next: incoming => {
        this.thePost.set(incoming)
        if(incoming.length > 0){
          this.metatagService.addPostSocialMediaMetaTags(this.thePost());
          this.loaderService.updateLoadingStatus('post', false);
        } else {
          this.loaderService.updateLoadingStatusOnEmptyResultAfterSeconds('post', false);
        }
      },
      error: error => {}
    });
  }

  private getLatestPosts(): void{
    const LIMIT_OF_POSTS = 4;
    this.loaderService.updateLoadingStatus('latestPosts', true);
    this.latestPosts = this.postFacade.getLatestPosts(LIMIT_OF_POSTS);
    this.loaderService.changingLoadStatusAfterResult(this.latestPosts(), 'latestPosts');
  }

}
