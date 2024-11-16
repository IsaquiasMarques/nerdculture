import { Component, input } from '@angular/core';
import { Podcast } from '@core/models/podcast.model';
import { FrendlyPodcastDateFormatPipe } from './pipes/frendly-podcast-date-format.pipe';

@Component({
  selector: 'app-podcast-template',
  standalone: true,
  imports: [ FrendlyPodcastDateFormatPipe ],
  templateUrl: './podcast.component.html',
  styleUrl: './podcast.component.css'
})
export class PodcastTemplate {
  podcast = input.required<Podcast>();
  templateSize = input<'long' | 'short' | 'incoming-podcast'>('long');
}
