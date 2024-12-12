import { computed, Injectable, signal, Signal, WritableSignal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Podcast } from "@core/models/podcast.model";
import { ApiService } from "@core/services/api.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PodcastFacade{

    private highlightedPodcasts$: Signal<Podcast[]> = signal([]);
    private incomingPodcasts$: Signal<Podcast[]> = signal([]);
    private ongoingPodcasts$: Signal<Podcast[]> = signal([]);

    constructor(
        private API: ApiService
    ) {
        this.highlightedPodcasts$ = toSignal(this.API.getHighlightedPodcasts(), { initialValue: [] });
        this.incomingPodcasts$ = toSignal(this.API.getIncomingPodcasts(), { initialValue: [] });
        this.ongoingPodcasts$ = toSignal(this.API.getOnGoingPodcasts(), { initialValue: [] })
    }

    get highlightedPodcasts(): Signal<Podcast[]>{
        return this.highlightedPodcasts$;
    }

    get incomingPodcasts(): Signal<Podcast[]>{
        return this.incomingPodcasts$;
    }

    get ongoingPodcasts(): Signal<Podcast[]>{
        return this.ongoingPodcasts$;
    }

    podcasts(current_page: number, per_page: number): Observable<Podcast[]>{
        return this.API.getPodcasts(current_page, per_page);
    }

}