import { inject, Injectable, signal, Signal, WritableSignal } from "@angular/core";
import { Podcast } from "@core/models/podcast.model";
import { Post } from "@core/models/post.model";
import { ApiService } from "@core/services/api.service";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SearchFacade{
    private API = inject(ApiService);

    postsResult$: Signal<Post[]> = signal([]);
    postNotFound$: WritableSignal<boolean> = signal(false);

    podcastResults$: Signal<Podcast[]> = signal([]);
    podcastNotFound$: WritableSignal<boolean> = signal(false);
    
    option: WritableSignal<'contents' | 'podcasts'> = signal('contents');
    
    changeOption(option: 'contents' | 'podcasts'): void{
        this.option.update(value => value = option);
        this.postNotFound$.update(val => val = false);
        this.podcastNotFound$.update(val => val = false);
    }

    cleanResults(): void{
        this.cleanPodcastsResults();
        this.cleanPostResults();
    }

    cleanPostResults(): void{
        this.postsResult$ = signal([]);
    }

    cleanPodcastsResults(): void{
        this.podcastResults$ = signal([]);
    }

    searchPodcasts(term: string): Observable<Podcast[]>{
        return this.API.searchPodcasts(term).pipe(
            map(incoming => {
                this.podcastResults$ = signal(incoming)
                if(this.podcastResults$().length === 0){
                    this.podcastNotFound$.update(val => val = true);
                } else {
                    this.podcastNotFound$.update(val => val = false);
                }
                return incoming;
            })
        );
    }

    searchPosts(term: string): Observable<Post[]>{
        return this.API.searchPosts(term).pipe(
            map(incoming => {
                this.postsResult$ = signal(incoming)
                if(this.postsResult$().length === 0){
                    this.postNotFound$.update(val => val = true);
                } else {
                    this.postNotFound$.update(val => val = false);
                }
                return incoming;
            })
        );
    }

}