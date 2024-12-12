import { Component, inject, OnInit } from '@angular/core';
import { LoaderExtender } from '@core/classes/loader-extender.class';
import { SearchFacade } from '@search/facades/search.facade';
import { PodcastsContainerNoScrollComponent } from '@shared/components/podcasts/podcasts-container/no-scroll/podcasts-container-no-scroll.component';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [ PodcastsContainerNoScrollComponent ],
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.css'
})
export class PodcastsComponent extends LoaderExtender implements OnInit {
  public searchFacade = inject(SearchFacade);

  ngOnInit(): void {
    this.searchFacade.changeOption('podcasts');
  }
}
