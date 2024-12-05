import { HttpClient, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NerdCultureCollection } from '@core/models/nerdculture-collection.model';
import { environment } from 'environments/environment';
import { map, Observable, tap } from 'rxjs';
import { Transformer } from './transformer.service';
import { Podcast } from '@core/models/podcast.model';
import { Post, PostCategory } from '@core/models/post.model';
import { PodcastStatus } from '@core/enums/podcast-status.enum';
import { Advertisement } from '@core/models/advertisement.model';
import { PaginationService } from './pagination.service';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private http = inject(HttpClient);
  private paginationService = inject(PaginationService);
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

  getIncomingPodcasts(): Observable<Podcast[]>{
    return this.http.get<Podcast[]>(` ${ environment.apiUrl }/wp-json/wp/v2/podcasts/futuros`)
                    .pipe(
                      map((incoming: any[]) => Transformer.podcasts(incoming))
                    );
  }

  getPodcasts(current_page: number = 1, per_page: number = 12): Observable<Podcast[]>{
    const perPage = (per_page) ? `&per_page=${ per_page }` : ``;
    const currentPage = (current_page) ? `&page=${ current_page }` : ``;
    
    return this.http.get<Podcast[]>(`${ environment.apiUrl }/wp-json/wp/v2/podcasts?${perPage + currentPage}&_fields[]=title&_fields[]=slug&_fields[]=title&_fields[]=acf`,
      { observe: 'response', transferCache: { includeHeaders: [ 'x-wp-total' ] } })
                    .pipe(
                      map((incoming: HttpResponse<any>) => {
                        const xWpTotalHeader = incoming.headers.get('x-wp-total');
                        this.paginationService.podcastsTotalOfPodcasts$.update(() => {
                          const parsedValue = xWpTotalHeader !== null ? parseInt(xWpTotalHeader, 10) : 0;
                          return parsedValue; // ou outra lógica para valores inválidos
                        });
                        return incoming.body;
                      }),
                      map((incoming: any[]) => Transformer.podcasts(incoming)),
                      map((incoming: Podcast[]) => incoming.filter(podcast => (podcast.status === PodcastStatus.PAST) || (podcast.status === PodcastStatus.ON_GOING))),
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
    const current_pageString = (current_page) ? `&page=${ current_page }` : '';
    return this.http.get<Post[]>(`${ environment.apiUrl }/wp-json/wp/v2/posts?_embed${ per_pageString + current_pageString }`)
                    .pipe(
                      map((incoming: any[]) => Transformer.posts(incoming))
                    )
  }

  getAdvertisements(): Observable<Advertisement[]>{
    return this.http.get<Advertisement[]>(`${ environment.apiUrl }/wp-json/wp/v2/anuncios?_fields[]=acf`)
                    .pipe(
                      map((incoming: any[]) => Transformer.advertisements(incoming))
                    );
  }

  getPostsByCategory(category_id: number, per_page: number, current_page: number, countTotal: boolean): Observable<Post[]>{
    const per_pageString = (per_page) ? `&per_page=${ per_page }` : '';
    const current_pageString = (current_page) ? `&page=${ current_page }` : '';
    return this.http.get<Post[]>(`${ environment.apiUrl }/wp-json/wp/v2/posts?categories=${ category_id }&_embed${ per_pageString + current_pageString }`,
      { observe: 'response', transferCache: { includeHeaders: ['x-wp-total'] } })
                    .pipe(
                      map((incoming: HttpResponse<any>) => {
                        const xWpTotalHeader = incoming.headers.get('x-wp-total');
                        if(countTotal){
                          this.paginationService.postsByCategoryTotalOfPosts$.update(() => {
                            const parsedValue = xWpTotalHeader !== null ? parseInt(xWpTotalHeader, 10) : 0;
                            return parsedValue; // ou outra lógica para valores inválidos
                          });
                        }
                        return incoming.body;
                      }),
                      map((incoming: any[]) => Transformer.posts(incoming))
                    )
  }

  getThePost(slug: string): Observable<Post[]>{
    return this.http.get<Post[]>(`${ environment.apiUrl }/wp-json/wp/v2/posts?slug=${ slug }&_embed`)
                    .pipe(
                      map((incoming: any[]) => Transformer.posts(incoming))
                    );
  }

}
