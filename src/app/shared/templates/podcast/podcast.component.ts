import { Component, input } from '@angular/core';
import { Podcast } from '@core/models/podcast.model';

@Component({
  selector: 'app-podcast-template',
  standalone: true,
  imports: [],
  templateUrl: './podcast.component.html',
  styleUrl: './podcast.component.css'
})
export class PodcastTemplate {
  podcast = input.required<Podcast>();
  templateSize = input<'long' | 'short'>('long');
}
