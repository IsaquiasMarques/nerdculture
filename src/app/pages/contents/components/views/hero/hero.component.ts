import { Component, computed, ElementRef, HostListener, input, Signal, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdvertisementContent } from '@core/models/advertisement.model';
import { PostCategory } from '@core/models/post.model';
import { AdvertisementsComponent } from '@shared/components/advertisements/advertisements.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ RouterLink, AdvertisementsComponent ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  categories = input.required<PostCategory[]>();
  advertisements = input.required<AdvertisementContent[]>();
  limitedContainerElementRef = viewChild<ElementRef<HTMLElement>>('limitedContainerElementRef');
  paddingX: Signal<number> = this.computed();

  @HostListener('window:resize', ['$event']) onResize(){
    this.paddingX = this.computed();
  }

  computed(): Signal<number>{
    return computed(() => this.limitedContainerElementRef()?.nativeElement.offsetLeft ?? 0);
  }

}
