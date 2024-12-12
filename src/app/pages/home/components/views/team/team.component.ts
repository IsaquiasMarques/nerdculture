import { NgOptimizedImage } from '@angular/common';
import { AfterViewInit, Component, computed, ElementRef, input, signal, ViewChild, WritableSignal } from '@angular/core';
import { LoaderExtender } from '@core/classes/loader-extender.class';
import { TeamMember } from '@core/models/team-members.model';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [ NgOptimizedImage ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent extends LoaderExtender implements AfterViewInit {
  @ViewChild('titleElementRef') titleElementRef!: ElementRef<HTMLElement>;
  mobileScrollerContainerPaddingX: WritableSignal<number> = signal(0);

  members = input.required<TeamMember[]>();
  placeholdersLength = input<number>(6);
  placeholderArray = computed(() => Array.from({ length: this.placeholdersLength() }));

  ngAfterViewInit(): void {
    this.mobileScrollerContainerPaddingX.update(val => val = this.titleElementRef.nativeElement.offsetLeft);
  }
}
