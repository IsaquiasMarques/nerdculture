import { inject, Injectable, OnInit, signal, WritableSignal } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class PaginationService{

    private activatedRoute = inject(ActivatedRoute);

    podcastsCurrentPage$: WritableSignal<number> = signal(1);
    podcastsTotalOfPodcasts$: WritableSignal<number> = signal(0);
    postsByCategoryCurrentPage$: WritableSignal<{ current_page: number, total_per_page: number , categorySlug?: string }> = signal({ current_page: 1, total_per_page: 16 });
    podcastsTotalOfPosts$: WritableSignal<number> = signal(0);

    constructor(){
        this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
            const current_page = (queryParams['page']) ? parseInt(queryParams['page']) : 1;
            this.podcastsCurrentPage$.update(value => value = current_page);
        });
    }

}