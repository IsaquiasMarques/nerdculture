import { Component, computed, inject, OnInit, signal, Signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AdvertisementClass } from '@core/classes/advertisement.class';
import { AdvertisementPage } from '@core/models/advertisement.model';
import { Podcast } from '@core/models/podcast.model';
import { PaginationService } from '@core/services/pagination.service';
import { IncomingPodcastsComponent } from '@podnerd/components/views/incoming-podcasts/incoming-podcasts.component';
import { AdvertisementsComponent } from '@shared/components/advertisements/advertisements.component';
import { HeroComponent } from '@shared/components/hero/hero.component';
import { PodcastsContainerNoScrollComponent } from '@shared/components/podcasts/podcasts-container/no-scroll/podcasts-container-no-scroll.component';
import { PodcastsContainerComponent } from '@shared/components/podcasts/podcasts-container/with-scroll/podcasts-container.component';
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
    AdvertisementsComponent,
    PodcastsContainerNoScrollComponent
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
  public paginationService = inject(PaginationService);

  private activatedRoute = inject(ActivatedRoute);
  private totalOfPodcastsPerPagination = 12;

  highlightedPodcasts: Signal<Podcast[]> = signal([]);
  incomingPodcasts: Signal<Podcast[]> = signal([]);
  podcastsBeforeLevel1Advertisement: Signal<Podcast[]> = signal([]);
  podcastsAfterLevel1Advertisement: Signal<Podcast[]> = signal([]);

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      const current_page: number = parseInt(queryParams['page']) ?? 1;
      this.paginationService.podcastsCurrentPage$.update(value => value = { current_page: current_page, total_per_page: this.totalOfPodcastsPerPagination });
      this.getPodcasts();
    });
    this.getHighlightedPodcasts();
    this.getIncomingPodcasts();
  }

  private getHighlightedPodcasts(): void{
    this.highlightedPodcasts = this.podcastFacade.highlightedPodcasts;
  }

  private getIncomingPodcasts(): void{
    this.incomingPodcasts = this.podcastFacade.incomingPodcasts;
  }

  private getPodcasts(): void{
    // const midpoint = Math.floor(this.totalOfPodcastsPerPagination / 2);

    this.podcastsBeforeLevel1Advertisement = computed(() => {
      const podcasts = this.podcastFacade.podcasts();
      const midpoint = Math.floor(this.totalOfPodcastsPerPagination / 2);
      return podcasts.slice(0, midpoint);
    });

    this.podcastsAfterLevel1Advertisement = computed(() => {
      const podcasts = this.podcastFacade.podcasts();
      const midpoint = Math.floor(this.totalOfPodcastsPerPagination / 2);
      
      // Verificar se existem podcasts suficientes para a segunda seção
      if (podcasts.length <= midpoint) {
        return []; // Retorna vazio se não houver podcasts suficientes
      }
      
      return podcasts.slice(midpoint);
    });
  }

}
