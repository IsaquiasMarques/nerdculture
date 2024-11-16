import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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
export class HomeComponent implements OnInit {
  private homeFacade = inject(HomeFacade);
  private themeService = inject(ThemeService).changeTheme(Theme.HOME);

  partners: Signal<Partner[]> = signal([]);
  teamMembers: Signal<TeamMember[]> = signal([]);
  podcasts: Signal<Podcast[]> = signal([]);
  posts: Signal<Post[]> = signal([]);
  categories: Signal<PostCategory[]> = signal([]);

  ngOnInit(): void {
    this.getPartners();
    this.getTeamMembers();
    this.getPodcasts();
    this.getLatestPosts();
    this.getCategories();
  }

  private getPartners(): void{
    this.partners = this.homeFacade.partners;
  }

  private getTeamMembers(): void{
    this.teamMembers = this.homeFacade.teamMembers;
  }

  private getPodcasts(): void{
    this.podcasts = this.homeFacade.highlightedPodcasts;
  }

  private getLatestPosts(): void{
    this.posts = this.homeFacade.latestPosts;
  }
  
  private getCategories(): void{
    this.categories = this.homeFacade.categories;
  }
}
