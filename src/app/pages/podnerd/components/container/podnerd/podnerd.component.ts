import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { AdvertisementClass } from '@core/classes/advertisement.class';
import { Advertisement, AdvertisementPage } from '@core/models/advertisement.model';
import { Podcast } from '@core/models/podcast.model';
import { IncomingPodcastsComponent } from '@podnerd/components/views/incoming-podcasts/incoming-podcasts.component';
import { AdvertisementsComponent } from '@shared/components/advertisements/advertisements.component';
import { HeroComponent } from '@shared/components/hero/hero.component';
import { PodcastFacade } from '@shared/facades/podcast.facade';
import { Theme, ThemeService } from '@shared/services/theme.service';
import { PodcastTemplate } from '@shared/templates/podcast/podcast.component';

@Component({
  selector: 'app-podnerd',
  standalone: true,
  imports: [
    HeroComponent,
    PodcastTemplate,
    IncomingPodcastsComponent,
    AdvertisementsComponent
  ],
  templateUrl: './podnerd.component.html',
  styleUrl: './podnerd.component.css'
})
export class PodnerdComponent extends AdvertisementClass implements OnInit {

  constructor(){
    super();
  }

  protected override page: AdvertisementPage = AdvertisementPage.PODNERD;
  private themeService = inject(ThemeService).changeTheme(Theme.PODNERD);
  private podcastFacade = inject(PodcastFacade);

  highlightedPodcasts: Signal<Podcast[]> = signal([]);
  incomingPodcasts: Signal<Podcast[]> = signal([]);
  podcasts: Signal<Podcast[]> = signal([]);

  ngOnInit(): void {
    this.getHighlightedPodcasts();
    this.getIncomingPodcasts();
  }

  private getHighlightedPodcasts(): void{
    this.highlightedPodcasts = this.podcastFacade.highlightedPodcasts;
  }

  private getIncomingPodcasts(): void{
    this.incomingPodcasts = this.podcastFacade.incomingPodcasts;
  }

}
