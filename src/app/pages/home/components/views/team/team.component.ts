import { AfterViewInit, Component, ElementRef, input, signal, ViewChild, WritableSignal } from '@angular/core';
import { TeamMember } from '@core/models/team-members.model';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements AfterViewInit {
  @ViewChild('titleElementRef') titleElementRef!: ElementRef<HTMLElement>;
  mobileScrollerContainerPaddingX: WritableSignal<number> = signal(0);

  members = input.required<TeamMember[]>();

  ngAfterViewInit(): void {
    this.mobileScrollerContainerPaddingX.update(val => val = this.titleElementRef.nativeElement.offsetLeft);
  }
}
