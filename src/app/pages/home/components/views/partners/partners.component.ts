import { Component, input } from '@angular/core';
import { Partner } from '@core/models/partner.model';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css'
})
export class PartnersComponent {
  partners = input.required<Partner[]>();
}
