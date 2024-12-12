import { Injectable, Signal, signal, WritableSignal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoaderService{

    private loaderContainer: LoaderContainer = {

        // nerdculture collection
        'partners': signal(false),
        'teamMembers': signal(false),

        // podcasts
        'podcasts': signal(false),
        'incomingPodcasts': signal(false),
        'highlightedPodcasts': signal(false),

        // posts
        'posts': signal(false),
        'latestPosts': signal(false),
        'postsByCategory': signal(false),
        'post': signal(false),

        //categories
        'categories': signal(false),
        'highlightedCategories': signal(false),

        // advertisements
        'advertisements': signal(false),

        // searching
        'searchPosts': signal(false),
        'searchPodcasts': signal(false)

    }

    getLoadingStatus(key: keyof(LoaderContainer)): Signal<boolean>{
        return this.loaderContainer[key];
    }

    updateLoadingStatus(key: keyof(LoaderContainer), newStatus: boolean): void{
        this.loaderContainer[key].update(value => value = newStatus);
    }

    updateLoadingStatusOnEmptyResultAfterSeconds(key: keyof(LoaderContainer), newStatus: boolean, checkingIntervalInSeconds: number =  1, timeoutInSeconds: number = 3): void{
        let checkingInterval = setInterval(() => {
            let timeOut = setTimeout(() => {
                this.updateLoadingStatus(key, newStatus);
                clearInterval(checkingInterval);
                clearTimeout(timeOut);
            }, timeoutInSeconds * 1000)
        }, checkingIntervalInSeconds * 1000);
    }

    changingLoadStatusAfterResult(itemsArray: any[], key: keyof(LoaderContainer)): void{
        if(itemsArray.length > 0){
            this.updateLoadingStatus(key, false);
        } else {
            this.updateLoadingStatusOnEmptyResultAfterSeconds(key, false);
        }
    }

}

export interface LoaderContainer{
    [key: string]: WritableSignal<boolean>
}