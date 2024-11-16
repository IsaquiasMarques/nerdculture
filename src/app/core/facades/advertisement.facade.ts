import { inject, Injectable, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Advertisement } from "@core/models/advertisement.model";
import { ApiService } from "@core/services/api.service";

@Injectable({
    providedIn: 'root'
})
export class AdvertisementFacade{
    private API = inject(ApiService);
    private ads: Signal<Advertisement[]>;

    constructor(){
        this.ads = toSignal(this.API.getAdvertisements(), { initialValue: [] });
    }

    get advertisements(): Signal<Advertisement[]>{
        return this.ads;
    }
}