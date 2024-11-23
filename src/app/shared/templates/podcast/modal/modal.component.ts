import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, EventEmitter, Inject, Input, input, OnChanges, Output, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { PodcastModalSupporter } from '@core/classes/podcast-modal.class';
import { Podcast } from '@core/models/podcast.model';
import { UrlSanitizerPipe } from './pipes/url-sanitizer.pipe';
import { PodcastStatus } from '@core/enums/podcast-status.enum';

@Component({
  selector: 'app-podcast-modal',
  standalone: true,
  imports: [ NgClass, UrlSanitizerPipe ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class PodcastModalComponent extends PodcastModalSupporter implements OnChanges {
  podcast = input.required<Podcast>();
  podcastStatus = PodcastStatus;
  @Input() showModalFromParent: boolean = false;
  @Output() hideModalOnParent = new EventEmitter<boolean>();

  constructor(@Inject(PLATFORM_ID) private platformId: any){
    super();
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if(this.showModalFromParent){
      this.openMedia();
    } else {
      this.hideMedia();
    }
  }

  openMedia(){
    this.showModalBackground.set(true);
    this.firstTimeOpeningModal.set(false);
    this.hideModalOnParent.emit(false);
    this.toggleOverflowHiddenBodyElement(true);
  }

  hideMedia(){
    this.showModalBackground.set(false);
    this.hideModalOnParent.emit(true);
    this.toggleOverflowHiddenBodyElement(false);
  }
  
  
  override toggleOverflowHiddenBodyElement(value: boolean){
    if(!isPlatformBrowser(this.platformId)) return;
    let bodyElement = document.querySelector("body") as HTMLElement;
    
    if(value){
      bodyElement.style.height = '90vh';
      bodyElement.style.overflow = 'hidden';
    }else{
      bodyElement.style.height = 'auto';
      bodyElement.style.overflow = 'auto';
    }
  }

}
