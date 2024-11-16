import { NgClass } from '@angular/common';
import { Component, ElementRef, input, OnInit, ViewChild } from '@angular/core';
import { ScrollerFunctionalities } from '@core/classes/scroller.class';
import { Podcast } from '@core/models/podcast.model';
import { PodcastTemplate } from '@shared/templates/podcast/podcast.component';

@Component({
  selector: 'app-incoming-podcasts',
  standalone: true,
  imports: [ PodcastTemplate, NgClass ],
  templateUrl: './incoming-podcasts.component.html',
  styleUrl: './incoming-podcasts.component.css'
})
export class IncomingPodcastsComponent extends ScrollerFunctionalities implements OnInit {
  podcasts = input.required<Podcast[]>();

  @ViewChild('scrollerContainerElementRef') sContainerElementRef!: ElementRef<HTMLElement>;
  @ViewChild('limitedContainerElementRef') lContainerElementRef!: ElementRef<HTMLElement>;
  
  override bootstrap(){
    this.scrollerElementRef = this.sContainerElementRef;
    this.limitedContainerElementRef = this.lContainerElementRef;
  }
  
  ngOnInit(): void {
    this.itemsArray = this.podcasts;
  }
}
