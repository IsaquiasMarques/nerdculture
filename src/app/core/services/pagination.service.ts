import { Injectable, signal, WritableSignal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PaginationService{
    podcastsCurrentPage$: WritableSignal<{ current_page: number, total_per_page: number }> = signal({ current_page: 1, total_per_page: 12 });
    postsByCategoryCurrentPage$: WritableSignal<{ current_page: number, total_per_page: number , categorySlug?: string }> = signal({ current_page: 1, total_per_page: 16 });
}