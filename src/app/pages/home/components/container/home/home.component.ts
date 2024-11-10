import { Component, inject, OnInit } from '@angular/core';
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
import { CategoryFacade } from '@shared/facades/category.facade';
import { PodcastFacade } from '@shared/facades/podcast.facade';
import { PostFacade } from '@shared/facades/post.facade';
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
  private podcastFacade = inject(PodcastFacade);
  private postFacade = inject(PostFacade);
  private categoryFacade = inject(CategoryFacade);

  private themeService = inject(ThemeService).changeTheme(Theme.HOME);

  partners: Partner[] = [];
  teamMembers: TeamMember[] = [];
  podcasts: Podcast[] = [];
  posts: Post[] = [];
  categories: PostCategory[] = [];

  ngOnInit(): void {
    this.getPartners();
    this.getTeamMembers();
    this.getPodcasts();
    this.getLatestPosts();
    this.getCategories();
  }

  getPartners(): void{
    this.partners = this.homeFacade.partners();
  }

  getTeamMembers(): void{
    this.teamMembers = this.homeFacade.teamMembers();
  }

  getPodcasts(): void{
    this.podcasts = this.homeFacade.highlightedPodcasts();
  }

  getLatestPosts(): void{
    this.posts = this.homeFacade.latestPosts();
  }
  
  getCategories(): void{
    this.categories = this.homeFacade.categories();
  }
}
