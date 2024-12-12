import { computed, Injectable, signal, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { PostCategory } from "@core/models/post.model";
import { ApiService } from "@core/services/api.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryFacade{
    private categories$: Signal<PostCategory[]> = signal([]);
    // private highlightedCategories$: Signal<PostCategory[]> = signal([]);

    constructor(
        private API: ApiService
    ){
        this.categories$ = toSignal(this.API.getCategories(), { initialValue: [] });
        // this.highlightedCategories$ = toSignal(this.API.getHighlightedCategories(), { initialValue: [] });
    }

    get all(): Signal<PostCategory[]>{
        return computed(() => this.categories$());
    }

    getCategoriesWithImages(limit: number = 9): Signal<PostCategory[]>{
        return computed(() => this.categories$().filter(category => category.image).slice(0, limit));
    }

    get highlightedCategories(): Observable<PostCategory[]>{
        // return computed(() => this.highlightedCategories$());
        return this.API.getHighlightedCategories();
    }

}