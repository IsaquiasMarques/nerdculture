import { Injectable, Signal, computed, inject } from '@angular/core';
import { Partner } from '@core/models/partner.model';
import { Podcast } from '@core/models/podcast.model';
import { Post, PostCategory } from '@core/models/post.model';
import { TeamMember } from '@core/models/team-members.model';
import { CategoryFacade } from '@shared/facades/category.facade';
import { NerdCultureFacadeCollection } from '@shared/facades/nerdculture-collection.facade';
import { PodcastFacade } from '@shared/facades/podcast.facade';
import { PostFacade } from '@shared/facades/post.facade';

@Injectable({
  providedIn: 'root'
})
export class HomeFacade {

  private nerdCultureCollectionFacade = inject(NerdCultureFacadeCollection);
  private podcastFacade = inject(PodcastFacade);
  private postFacade = inject(PostFacade);
  private categoryFacade = inject(CategoryFacade);

  constructor() { }

  get partners(): Signal<Partner[]>{
    return this.nerdCultureCollectionFacade.partners;
  }

  get teamMembers(): Signal<TeamMember[]>{
    return this.nerdCultureCollectionFacade.teamMembers;
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
