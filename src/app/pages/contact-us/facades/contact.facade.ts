import { inject, Injectable, Signal } from "@angular/core";
import { Contact } from "@core/models/contact.model";
import { ApiService } from "@core/services/api.service";
import { NerdCultureFacadeCollection } from "@shared/facades/nerdculture-collection.facade";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ContactFacade{
    private API = inject(ApiService);
    private nerdCultureCollectionFacade = inject(NerdCultureFacadeCollection);

    get contacts(): Signal<Contact[]>{
        return this.nerdCultureCollectionFacade.contacts;
    }

    getInTouch(formdata: FormData): Observable<any>{
        return this.API.getInTouch(formdata);
    }

}