import { computed, Directive, inject, signal, Signal } from "@angular/core";
import { AdvertisementFacade } from "@core/facades/advertisement.facade";
import { Advertisement, AdvertisementContent, AdvertisementPage } from "@core/models/advertisement.model";

@Directive()
export class AdvertisementClass{

    protected page!: AdvertisementPage;
    private advertisements$: Signal<Advertisement[]> = signal([]);
    private advertisementFacade = inject(AdvertisementFacade);

    constructor(){
        this.advertisements$ = computed(() => this.advertisementFacade.advertisements());
    }

    get getAdvertisements(): Signal<AdvertisementContent[]>{
        return computed(() => this.advertisements$().filter(item => item.page === this.page).flatMap(item => item.contents))
    }

}