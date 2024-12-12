import { Component, computed, input, signal, WritableSignal } from '@angular/core';
import { Podcast } from '@core/models/podcast.model';
import { FrendlyPodcastDateFormatPipe } from './pipes/frendly-podcast-date-format.pipe';
import { PodcastModalComponent } from './modal/modal.component';
import { RouterLink } from '@angular/router';
import { PodcastStatus } from '@core/enums/podcast-status.enum';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-podcast-template',
  standalone: true,
  imports: [ FrendlyPodcastDateFormatPipe, PodcastModalComponent, RouterLink, NgOptimizedImage ],
  templateUrl: './podcast.component.html',
  styleUrl: './podcast.component.css'
})
export class PodcastTemplate {
  podcast = input.required<Podcast>();
  isLoading = input<boolean>(false);

  templateSize = input<'long' | 'short' | 'incoming-podcast'>('long');
  showMedia = false;
  podcastStatus = PodcastStatus;

  openMedia(){
    this.showMedia = true;
  }

  hideModalStatusEventHandler(event: boolean){
    if(event){
      this.showMedia = false;
    }
  }
  
}
