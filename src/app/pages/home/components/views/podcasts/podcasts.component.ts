import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, input, signal, ViewChild } from '@angular/core';
import { Podcast } from '@core/models/podcast.model';
import { PodcastsContainerComponent } from '@shared/components/podcasts/podcasts-container/podcasts-container.component';
import { DecimalAuxPipe } from '@shared/pipes/decimal-aux.pipe';
import { PodcastTemplate } from '@shared/templates/podcast/podcast.component';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [ DecimalPipe, DecimalAuxPipe, PodcastsContainerComponent ],
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.css'
})
export class PodcastsComponent implements AfterViewInit {
  podcasts = input.required<Podcast[]>();
  @ViewChild('limitedContainerElementRef') limitedContainerElementRef!: ElementRef<HTMLElement>;
  originalContentPaddingX = signal(0);

  ngAfterViewInit(): void {
    this.originalContentPaddingX.update(val => val = this.limitedContainerElementRef.nativeElement.offsetLeft);
  }

}
