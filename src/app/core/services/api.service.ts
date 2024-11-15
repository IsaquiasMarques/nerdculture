import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NerdCultureCollection } from '@core/models/nerdculture-collection.model';
import { environment } from 'environments/environment';
import { map, Observable, tap } from 'rxjs';
import { Transformer } from './transformer.service';
import { Podcast } from '@core/models/podcast.model';
import { Post, PostCategory } from '@core/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private http = inject(HttpClient);
  constructor() { }

  getNerdcultureDatas(): Observable<NerdCultureCollection>{
    return this.http.get<NerdCultureCollection>(`${ environment.apiUrl }/wp-json/wp/v2/nerdculture`)
                    .pipe(
                      map((incoming: any) => {
                        return {
                            partners: Transformer.partners(incoming.nerdculture.parceiros),
                            members: Transformer.members(incoming.nerdculture.equipa)
                        }
                      })
                    );
  }

  getHighlightedPodcasts(): Observable<Podcast[]>{
    return this.http.get<Podcast[]>(` ${ environment.apiUrl }/wp-json/wp/v2/podcasts/destacados`)
                    .pipe(
                      map((incoming: any[]) => Transformer.podcasts(incoming))
                    );
  }

  getPodcasts(): Observable<Podcast[]>{
    return this.http.get<Podcast[]>(`${ environment.apiUrl }/wp-json/wp/v2/podcasts?_fields[]=title&_fields[]=slug&_fields[]=title&_fields[]=acf`)
                    .pipe(
                      map((incoming: any[]) => Transformer.podcasts(incoming))
                    );
  }

  getCategories(): Observable<PostCategory[]>{
    return this.http.get<PostCategory[]>(`${ environment.apiUrl }/wp-json/wp/v2/categories?exclude=1&_fields[]=id&_fields[]=count&_fields[]=name&_fields[]=slug&_fields[]=name&_fields[]=acf`)
                    .pipe(
                      map((incoming: any[]) => Transformer.categories(incoming)),
                      map((categories: PostCategory[]) => categories.sort((a: PostCategory, b: PostCategory) => {
                        if(a.count > b.count){
                          return -1;
                        } else  if(a.count < b.count) {
                          return 1;
                        } else {
                          return 0;
                        }
                      }))
                    )
  }

  getLatestPosts(per_page: number, current_page: number): Observable<Post[]>{
    const per_pageString = (per_page) ? `&per_page=${ per_page }` : '';
    const current_pageString = (current_page) ? `&current_page=${ current_page }` : '';
    return this.http.get<Post[]>(`${ environment.apiUrl }/wp-json/wp/v2/posts?_embed${ per_pageString + current_pageString }`)
                    .pipe(
                      map((incoming: any[]) => Transformer.posts(incoming))
                    )
  }

  getPostsByCategory(category_id: number, per_page: number, current_page: number): Observable<Post[]>{
    const per_pageString = (per_page) ? `&per_page=${ per_page }` : '';
    const current_pageString = (current_page) ? `&current_page=${ current_page }` : '';
    return this.http.get<Post[]>(`${ environment.apiUrl }/wp-json/wp/v2/posts?categories=${ category_id }&_embed${ per_pageString + current_pageString }`)
                    .pipe(
                      map((incoming: any[]) => Transformer.posts(incoming))
                    )
  }

}
