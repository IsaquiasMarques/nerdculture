import { Component, computed, input } from '@angular/core';
import { LoaderExtender } from '@core/classes/loader-extender.class';
import { Partner } from '@core/models/partner.model';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css'
})
export class PartnersComponent extends LoaderExtender {
  partners = input.required<Partner[]>();
  placeholdersLength = input<number>(6);
  placeholderArray = computed(() => Array.from({ length: this.placeholdersLength() }));
}
