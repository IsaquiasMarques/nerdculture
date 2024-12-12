import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Contact } from '@core/models/contact.model';
import { NerdCultureCollection } from '@core/models/nerdculture-collection.model';
import { Partner } from '@core/models/partner.model';
import { TeamMember } from '@core/models/team-members.model';
import { ApiService } from '@core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class NerdCultureFacadeCollection {

  private API = inject(ApiService);
  private nerdCultureCollection!: Signal<NerdCultureCollection>;

  constructor() {
    this.nerdCultureCollection = toSignal(this.API.getNerdcultureDatas(), { initialValue: { partners: [], members: [], contacts: [] } });
  }

  get partners(): Signal<Partner[]>{
    return computed(() => this.nerdCultureCollection().partners );
  }

  get teamMembers(): Signal<TeamMember[]>{
    return computed(() => this.nerdCultureCollection().members );
  }

  get contacts(): Signal<Contact[]>{
    return computed(() => this.nerdCultureCollection().contacts )
  }

}