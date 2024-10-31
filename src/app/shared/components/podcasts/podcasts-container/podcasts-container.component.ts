import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Podcast } from '@core/models/podcast.model';
import { PodcastTemplate } from '@shared/templates/podcast/podcast.component';

@Component({
  selector: 'app-podcasts-container',
  standalone: true,
  imports: [ PodcastTemplate, RouterLink ],
  templateUrl: './podcasts-container.component.html',
  styleUrl: './podcasts-container.component.css'
})
export class PodcastsContainerComponent {
  podcasts = input.required<Podcast[]>();
  showButton = input<boolean>(false)
}
