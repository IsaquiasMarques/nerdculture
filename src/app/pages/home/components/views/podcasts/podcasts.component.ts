import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { AfterViewInit, Component, ElementRef, input, signal, ViewChild } from '@angular/core';
import { LoaderExtender } from '@core/classes/loader-extender.class';
import { Podcast } from '@core/models/podcast.model';
import { PodcastsContainerComponent } from '@shared/components/podcasts/podcasts-container/with-scroll/podcasts-container.component';
import { DecimalAuxPipe } from '@shared/pipes/decimal-aux.pipe';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [ DecimalPipe, NgOptimizedImage, DecimalAuxPipe, PodcastsContainerComponent ],
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.css'
})
export class PodcastsComponent extends LoaderExtender implements AfterViewInit {
  podcasts = input.required<Podcast[]>();

  @ViewChild('limitedContainerElementRef') limitedContainerElementRef!: ElementRef<HTMLElement>;
  originalContentPaddingX = signal(0);

  ngAfterViewInit(): void {
    this.originalContentPaddingX.update(val => val = this.limitedContainerElementRef.nativeElement.offsetLeft);
  }

}
