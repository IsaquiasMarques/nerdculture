import { Component, computed, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AdvertisementClass } from '@core/classes/advertisement.class';
import { LoaderExtender } from '@core/classes/loader-extender.class';
import { AdvertisementPage } from '@core/models/advertisement.model';
import { Podcast } from '@core/models/podcast.model';
import { LoaderService } from '@core/services/loader.service';
import { PaginationService } from '@core/services/pagination.service';
import { IncomingPodcastsComponent } from '@podnerd/components/views/incoming-podcasts/incoming-podcasts.component';
import { AdvertisementsComponent } from '@shared/components/advertisements/advertisements.component';
import { HeroComponent } from '@shared/components/hero/hero.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PodcastsContainerNoScrollComponent } from '@shared/components/podcasts/podcasts-container/no-scroll/podcasts-container-no-scroll.component';
import { PodcastsContainerComponent } from '@shared/components/podcasts/podcasts-container/with-scroll/podcasts-container.component';
import { PodcastFacade } from '@shared/facades/podcast.facade';
import { MetaTagService } from '@shared/services/meta-tag.service';
import { Theme, ThemeService } from '@shared/services/theme.service';
import { PodcastTemplate } from '@shared/templates/podcast/podcast.component';
import { map, tap } from 'rxjs';

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

  loaderService = inject(LoaderService);

  protected override page: AdvertisementPage = AdvertisementPage.PODNERD;
  private themeService = inject(ThemeService).changeTheme(Theme.PODNERD);
  private podcastFacade = inject(PodcastFacade);
  public paginationService = inject(PaginationService);

  private activatedRoute = inject(ActivatedRoute);
  public totalOfPodcastsPerPagination = 12;
  public current_page: number = 1;

  private metatagService = inject(MetaTagService);

  highlightedPodcasts: Signal<Podcast[]> = signal([]);
  incomingPodcasts: Signal<Podcast[]> = signal([]);
  ongoingPodcasts: Signal<Podcast[]> = signal([]);

  podcastsBeforeLevel1Advertisement: WritableSignal<Podcast[]> = signal([]);
  podcastsAfterLevel1Advertisement: WritableSignal<Podcast[]> = signal([]);

  getPodcastsError?: { status: number, message: string };

  ngOnInit(): void {

    this.metatagService.addMetaTags({
      title: 'Pod Nerd - Explorando Novas Fronteiras',
      description: 'De entrevistas com especialistas a discussões profundas sobre as últimas tendências, nossos podcasts são a chave para desbloquear novas ideias e expandir seus horizontes',
      image: 'assets/static/profile/podnerd-2.png',
      url: 'https://nerdculture.ao/podnerd'
    });

    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.getPodcastsError = undefined;
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
    this.loaderService.updateLoadingStatus('incomingPodcasts', true);
    this.incomingPodcasts = this.podcastFacade.incomingPodcasts;
    this.loaderService.changingLoadStatusAfterResult(this.incomingPodcasts(), 'incomingPodcasts');
  }

  private getOnGoingPodcasts(): void{
    this.ongoingPodcasts = this.podcastFacade.ongoingPodcasts;
  }

  private getPodcasts(current_page: number): void{
    this.loaderService.updateLoadingStatus('podcasts', true);
    
    this.getOnGoingPodcasts();
    this.loaderService.updateLoadingStatus('podcasts', true);
    this.podcastFacade.podcasts(current_page, this.totalOfPodcastsPerPagination - this.ongoingPodcasts().length)
    .pipe(
      map(incoming => {
        return (current_page == 1) ? [...this.ongoingPodcasts(), ...incoming] : incoming
      }),
    )
    .subscribe({
      next: incoming => {

        const podcasts = incoming;
        this.loaderService.changingLoadStatusAfterResult(podcasts, 'podcasts');

        const midpoint = Math.floor(this.totalOfPodcastsPerPagination / 2);

        // Cria cópias do array ao invés de modificar o original
        const podcastsBefore = podcasts.slice(0, midpoint); // Pega os primeiros 'midpoint' itens
        const podcastsAfter = (podcasts.length <= midpoint) ? [] : podcasts.slice(midpoint); // Pega os itens restantes a partir de 'midpoint'

        // Atualiza as variáveis com as cópias dos arrays
        this.podcastsBeforeLevel1Advertisement.set(podcastsBefore);
        this.podcastsAfterLevel1Advertisement.set(podcastsAfter);
        
      },
      error: error => {
        this.getPodcastsError = { status: error.error.data.status, message: error.error.message }
        this.loaderService.updateLoadingStatus('podcasts', false);
        console.error(error.error.message)
      }
    });
  }

}
