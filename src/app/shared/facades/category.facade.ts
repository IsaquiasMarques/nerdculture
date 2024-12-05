import { computed, inject, Injectable, signal, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { PostCategory } from "@core/models/post.model";
import { ApiService } from "@core/services/api.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryFacade{
    private API = inject(ApiService);
    private categories$: Signal<PostCategory[]> = signal([]);
    private highlightedCategories$: Signal<PostCategory[]> = signal([]);

    constructor(){
        const MAX_HIGLIGHTED_CATEGORIES: number = 3;
        this.categories$ = toSignal(this.API.getCategories(), { initialValue: [] });
        this.highlightedCategories$ = computed(() => {
            return this.categories$().filter((category: PostCategory) => category.highlighted && category.count > 0).sort((a, b) => {
                if(a.id > b.id){
                    return -1;
                } else  if(a.id < b.id) {
                    return 1;
                } else {
                    return 0;
                }
            }).slice(0, MAX_HIGLIGHTED_CATEGORIES)
        });
    }

    get all(): Signal<PostCategory[]>{
        return this.categories$;
    }

    getCategoriesWithImages(limit: number = 9): Signal<PostCategory[]>{
        return computed(() => this.categories$().filter(category => category.image).slice(0, limit));
    }

    get highlightedCategories(): Signal<PostCategory[]>{
        return this.highlightedCategories$;
    }

}