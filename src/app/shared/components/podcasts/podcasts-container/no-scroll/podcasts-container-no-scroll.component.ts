import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Podcast } from '@core/models/podcast.model';
import { PodcastTemplate } from '@shared/templates/podcast/podcast.component';

@Component({
  selector: 'app-podcasts-container-no-scroll',
  standalone: true,
  imports: [ PodcastTemplate ],
  templateUrl: './podcasts-container-no-scroll.component.html',
  styleUrl: './podcasts-container-no-scroll.component.css'
})
export class PodcastsContainerNoScrollComponent {
  podcasts = input.required<Podcast[]>();
  
  isLoading = input<boolean>(false);
  placeholderLength = input<number>(6);
  placeholderArray = computed(() => Array.from({ length: this.placeholderLength() }));

}
