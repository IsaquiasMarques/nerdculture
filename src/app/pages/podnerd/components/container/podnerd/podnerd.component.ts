import { Component, computed, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AdvertisementClass } from '@core/classes/advertisement.class';
import { AdvertisementPage } from '@core/models/advertisement.model';
import { Podcast } from '@core/models/podcast.model';
import { PaginationService } from '@core/services/pagination.service';
import { IncomingPodcastsComponent } from '@podnerd/components/views/incoming-podcasts/incoming-podcasts.component';
import { AdvertisementsComponent } from '@shared/components/advertisements/advertisements.component';
import { HeroComponent } from '@shared/components/hero/hero.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
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
    PodcastsContainerNoScrollComponent,
    PaginationComponent
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
  public totalOfPodcastsPerPagination = 12;
  public current_page: number = 1;

  highlightedPodcasts: Signal<Podcast[]> = signal([]);
  incomingPodcasts: Signal<Podcast[]> = signal([]);
  podcastsBeforeLevel1Advertisement: WritableSignal<Podcast[]> = signal([]);
  podcastsAfterLevel1Advertisement: WritableSignal<Podcast[]> = signal([]);

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.current_page = (queryParams['page']) ? parseInt(queryParams['page']) : 1;
      this.getPodcasts(this.current_page);
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

  private getPodcasts(current_page: number): void{
    this.podcastFacade.podcasts(current_page, this.totalOfPodcastsPerPagination).subscribe({
      next: incoming => {
        const podcasts = incoming;
        const midpoint = Math.floor(this.totalOfPodcastsPerPagination / 2);

        // Cria cópias do array ao invés de modificar o original
        const podcastsBefore = podcasts.slice(0, midpoint); // Pega os primeiros 'midpoint' itens
        const podcastsAfter = (podcasts.length <= midpoint) ? [] : podcasts.slice(midpoint); // Pega os itens restantes a partir de 'midpoint'

        // Atualiza as variáveis com as cópias dos arrays
        this.podcastsBeforeLevel1Advertisement.set(podcastsBefore);
        this.podcastsAfterLevel1Advertisement.set(podcastsAfter);
      }
    });
  }

}
