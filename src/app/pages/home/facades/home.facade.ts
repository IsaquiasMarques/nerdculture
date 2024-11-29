import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NerdCultureCollection } from '@core/models/nerdculture-collection.model';
import { Partner } from '@core/models/partner.model';
import { Podcast } from '@core/models/podcast.model';
import { Post, PostCategory } from '@core/models/post.model';
import { TeamMember } from '@core/models/team-members.model';
import { ApiService } from '@core/services/api.service';
import { CategoryFacade } from '@shared/facades/category.facade';
import { PodcastFacade } from '@shared/facades/podcast.facade';
import { PostFacade } from '@shared/facades/post.facade';

@Injectable({
  providedIn: 'root'
})
export class HomeFacade {

  private API = inject(ApiService);
  private nerdCultureCollection!: Signal<NerdCultureCollection>;
  private podcastFacade = inject(PodcastFacade);
  private postFacade = inject(PostFacade);
  private categoryFacade = inject(CategoryFacade);

  constructor() {
    this.nerdCultureCollection = toSignal(this.API.getNerdcultureDatas(), { initialValue: { partners: [], members: [] } });
  }

  get partners(): Signal<Partner[]>{
    return computed(() => {
      return this.nerdCultureCollection().partners
    });
  }

  get teamMembers(): Signal<TeamMember[]>{
    return computed(() => {
      return this.nerdCultureCollection().members
    });
  }

  get highlightedPodcasts(): Signal<Podcast[]>{
    return computed(() => this.podcastFacade.highlightedPodcasts());
  }
  
  get categories(): Signal<PostCategory[]>{
    const LIMIT_OF_CATEGORIES = 9;
    return computed(() => this.categoryFacade.getCategoriesWithImages(LIMIT_OF_CATEGORIES)());
  }

  getLatestPosts(limit: number): Signal<Post[]>{
    return this.postFacade.getLatestPosts(limit);
  }

}
