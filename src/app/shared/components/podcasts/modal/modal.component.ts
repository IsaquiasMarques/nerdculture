import { Component, input } from '@angular/core';
import { Podcast } from '@core/models/podcast.model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  podcast = input.required<Podcast>();
  show = input.required<boolean>();
}
