import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Podcast } from '@core/models/podcast.model';
import { PodcastTemplate } from '@shared/templates/podcast/podcast.component';

@Component({
  selector: 'app-podcasts-container-no-scroll',
  standalone: true,
  imports: [ PodcastTemplate, RouterLink ],
  templateUrl: './podcasts-container-no-scroll.component.html',
  styleUrl: './podcasts-container-no-scroll.component.css'
})
export class PodcastsContainerNoScrollComponent {
  podcasts = input.required<Podcast[]>();
}