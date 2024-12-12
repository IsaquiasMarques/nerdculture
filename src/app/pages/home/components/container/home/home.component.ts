import { Component, computed, inject, OnInit, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderExtender } from '@core/classes/loader-extender.class';
import { Partner } from '@core/models/partner.model';
import { Podcast } from '@core/models/podcast.model';
import { Post, PostCategory } from '@core/models/post.model';
import { TeamMember } from '@core/models/team-members.model';
import { AboutUsComponent } from '@home/components/views/about-us/about-us.component';
import { LatestPostsComponent } from '@home/components/views/latest-posts/latest-posts.component';
import { PartnersComponent } from '@home/components/views/partners/partners.component';
import { PodcastsComponent } from '@home/components/views/podcasts/podcasts.component';
import { TeamComponent } from '@home/components/views/team/team.component';
import { HomeFacade } from '@home/facades/home.facade';
import { HeroComponent } from '@shared/components/hero/hero.component';
import { MetaTagService } from '@shared/services/meta-tag.service';
import { Theme, ThemeService } from '@shared/services/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    PartnersComponent,
    AboutUsComponent,
    TeamComponent,
    PodcastsComponent,
    LatestPostsComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent extends LoaderExtender implements OnInit {
  private homeFacade = inject(HomeFacade);
  private themeService = inject(ThemeService).changeTheme(Theme.HOME);

  private metatagService = inject(MetaTagService);

  partners: Signal<Partner[]> = signal([]);
  teamMembers: Signal<TeamMember[]> = signal([]);
  podcasts: Signal<Podcast[]> = signal([]);
  posts: Signal<Post[]> = signal([]);
  categories: Signal<PostCategory[]> = signal([]);

  ngOnInit(): void {

    this.metatagService.addMetaTags({
      title: 'Nerd Culture - O Portal do Nerd Moderno',
      description: 'Na Nerd Culture, exploramos tecnologia, celebramos a inovação e mergulhamos nos mundos do cinema e dos games. Prepare-se para descobertas emocionantes',
      image: 'assets/static/profile/profile.png',
      url: 'https://nerdculture.ao'
    });

    this.getPartners();
    this.getTeamMembers();
    this.getPodcasts();
    this.getLatestPosts();
    this.getCategories();
  }

  private getPartners(): void{
    this.loaderService.updateLoadingStatus('partners', true);
    this.partners = this.homeFacade.partners;
    this.loaderService.changingLoadStatusAfterResult(this.partners(), 'partners');
  }

  private getTeamMembers(): void{
    this.loaderService.updateLoadingStatus('teamMembers', true);
    this.teamMembers = this.homeFacade.teamMembers;
    this.loaderService.changingLoadStatusAfterResult(this.teamMembers(), 'teamMembers');
  }

  private getPodcasts(): void{
    this.loaderService.updateLoadingStatus('highlightedPodcasts', true);
    this.podcasts = this.homeFacade.highlightedPodcasts;
    this.loaderService.changingLoadStatusAfterResult(this.podcasts(), 'highlightedPodcasts');
  }

  private getLatestPosts(): void{
    const LIMIT_OF_POSTS = 4;
    this.loaderService.updateLoadingStatus('latestPosts', true);
    this.posts = this.homeFacade.getLatestPosts(LIMIT_OF_POSTS);
    this.loaderService.changingLoadStatusAfterResult(this.posts(), 'latestPosts');
  }
  
  private getCategories(): void{
    this.loaderService.updateLoadingStatus('categories', true);
    this.categories = this.homeFacade.categories;
    this.loaderService.changingLoadStatusAfterResult(this.categories(), 'categories');
  }
}
