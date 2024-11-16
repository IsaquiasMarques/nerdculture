import { computed, Injectable, signal, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Podcast } from "@core/models/podcast.model";
import { ApiService } from "@core/services/api.service";

@Injectable({ providedIn: 'root' })
export class PodcastFacade{

    private podcasts$: Signal<Podcast[]> = signal([]);
    private highlightedPodcasts$: Signal<Podcast[]> = signal([]);
    private incomingPodcasts$: Signal<Podcast[]> = signal([]);

    constructor(
        private API: ApiService
    ) {
        this.podcasts$ = toSignal(this.API.getPodcasts(), { initialValue: [] });
        this.highlightedPodcasts$ = toSignal(this.API.getHighlightedPodcasts(), { initialValue: [] });
        this.incomingPodcasts$ = toSignal(this.API.getIncomingPodcasts(), { initialValue: [] });
    }

    get highlightedPodcasts(): Signal<Podcast[]>{
        return this.highlightedPodcasts$;
    }

    get incomingPodcasts(): Signal<Podcast[]>{
        return this.incomingPodcasts$;
    }

    get podcasts(): Signal<Podcast[]>{
        return this.podcasts$;
    }

}