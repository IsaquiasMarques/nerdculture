import { Component, inject, OnInit } from '@angular/core';
import { Podcast } from '@core/models/podcast.model';
import { HeroComponent } from '@shared/components/hero/hero.component';
import { PodcastsContainerComponent } from '@shared/components/podcasts/podcasts-container/podcasts-container.component';
import { PodcastFacade } from '@shared/facades/podcast.facade';
import { Theme, ThemeService } from '@shared/services/theme.service';
import { PodcastTemplate } from '@shared/templates/podcast/podcast.component';

@Component({
  selector: 'app-podnerd',
  standalone: true,
  imports: [ HeroComponent, PodcastTemplate ],
  templateUrl: './podnerd.component.html',
  styleUrl: './podnerd.component.css'
})
export class PodnerdComponent implements OnInit {
  private themeService = inject(ThemeService).changeTheme(Theme.PODNERD);

  private podcastFacade = inject(PodcastFacade);

  highlightedPodcasts: Podcast[] = [];
  incomingPodcasts: Podcast[] = [];
  podcasts: Podcast[] = [];

  ngOnInit(): void {
    this.getHighlightedPodcasts();
  }

  getHighlightedPodcasts(): void{
    this.highlightedPodcasts = this.podcastFacade.highlightedPodcasts();
  }

}
