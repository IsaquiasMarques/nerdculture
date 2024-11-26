import { computed, inject, Injectable, signal, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Post } from "@core/models/post.model";
import { ApiService } from "@core/services/api.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostFacade{
    private API = inject(ApiService);
    private latestPosts$: Signal<Post[]> = signal([]);

    constructor(){
        const { LIMIT_OF_POSTS, CURRENT_PAGE } = { LIMIT_OF_POSTS: 4, CURRENT_PAGE: 1 };
        this.latestPosts$ = toSignal(this.API.getLatestPosts(LIMIT_OF_POSTS, CURRENT_PAGE), { initialValue: [] });
    }
    
    get latestPosts(): Signal<Post[]>{
        return computed(() => this.latestPosts$());
    }

    getPostsByCategory(id: number, per_page: number, current_page: number): Observable<Post[]>{
        return this.API.getPostsByCategory(id, per_page, current_page);
    }
}