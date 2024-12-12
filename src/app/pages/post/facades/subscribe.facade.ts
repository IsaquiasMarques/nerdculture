import { inject, Injectable } from "@angular/core";
import { ApiService } from "@core/services/api.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SubscribeFacade{

    private API = inject(ApiService);

    subscribe(subscriber: any): Observable<any>{
        return this.API.subscribe(subscriber);
    }

}