import { NgClass } from '@angular/common';
import { Component, computed, ElementRef, input, ViewChild } from '@angular/core';
import { ScrollerFunctionalities } from '@core/classes/scroller.class';
import { AdvertisementContent, AdvertisementLevel } from '@core/models/advertisement.model';

@Component({
  selector: 'app-advertisements',
  standalone: true,
  imports: [ NgClass ],
  templateUrl: './advertisements.component.html',
  styleUrl: './advertisements.component.css'
})
export class AdvertisementsComponent extends ScrollerFunctionalities {

  constructor(){ super(); }

  override withaddingSpacing: boolean = false;
  @ViewChild('sliderElementRef') sliderElementRef!: ElementRef<HTMLElement>;
  @ViewChild('limitedContainerElementRef') HostLimitedContainerElementRef!: ElementRef<HTMLElement>;

  protected override bootstrap(): void {
    this.scrollerElementRef = this.sliderElementRef;
    this.limitedContainerElementRef = this.HostLimitedContainerElementRef;
    this.itemsArray = this.advertisementsByLevel$;
  }

  advertisementsContents = input.required<AdvertisementContent[]>();
  level = input.required<AdvertisementLevel>();
  label = input<boolean>(true);
  limitedContainer = input<boolean>(true);
  dashControllers = input<boolean>(true);

  advertisementsByLevel$ = computed(() => this.advertisementsContents().filter(item => item.position === this.level()));
}
