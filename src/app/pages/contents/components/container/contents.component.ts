import { Component, computed, effect, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { AdvertisementClass } from '@core/classes/advertisement.class';
import { AdvertisementPage } from '@core/models/advertisement.model';
import { Post, PostCategory } from '@core/models/post.model';
import { CategoryFacade } from '@shared/facades/category.facade';
import { Theme, ThemeService } from '@shared/services/theme.service';
import { HeroComponent } from '@shared/components/posts/hero/hero.component';
import { HighlightedCategoriesComponent } from '../views/highlighted-categories/highlighted-categories.component';
import { PostFacade } from '@shared/facades/post.facade';
import { forkJoin, Observable, of, switchMap, tap } from 'rxjs';
import { LatestPostsComponent } from '../views/latest-posts/latest-posts.component';
import { AdvertisementsComponent } from '@shared/components/advertisements/advertisements.component';
import { BlockContentComponent } from '../views/block-content/block-content.component';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-contents',
  standalone: true,
  imports: [ HeroComponent, HighlightedCategoriesComponent, LatestPostsComponent, AdvertisementsComponent, BlockContentComponent ],
  templateUrl: './contents.component.html',
  styleUrl: './contents.component.css'
})
export class ContentsComponent extends AdvertisementClass implements OnInit {

  constructor(){
    super();
  }

  loaderService = inject(LoaderService);

  protected override page: AdvertisementPage = AdvertisementPage.BLOG;
  private themeService = inject(ThemeService).changeTheme(Theme.WHITE);

  private categoryFacade = inject(CategoryFacade);
  private postFacade = inject(PostFacade);

  categories: Signal<PostCategory[]> = signal([]);
  private highlightedCategories: WritableSignal<PostCategory[]> = signal([]);
  latestPosts: Signal<Post[]> = signal([]);

  highlightedContents: WritableSignal<HighlightedContents[]> = signal([]);

  contentBlocks: HighlightedContents[] = [];
  blocksBeforeAdvertisement: WritableSignal<HighlightedContents[]> = signal([]);
  blocksAfterAdvertisement: WritableSignal<HighlightedContents[]> = signal([]);

  ngOnInit(): void {
    this.getCategories();
    this.getHighlightedCategories();
    this.getLatestPosts();
    this.getContents();
  }

  private fetchPostsForCategory(category_id: number): Observable<Post[]> {
    return this.postFacade.getPostsByCategory(category_id, 5, 1);
  }

  private getCategories(): void{
    this.loaderService.updateLoadingStatus('categories', true);
    this.categories = this.categoryFacade.all;
    this.loaderService.changingLoadStatusAfterResult(this.categories(), 'categories');
  }

  private getHighlightedCategories(): void{
    this.loaderService.updateLoadingStatus('highlightedCategories', true);
    this.categoryFacade.highlightedCategories
      .pipe(
        tap(incoming => {
          this.highlightedCategories.set(incoming); // Atualiza a signal diretamente
          this.highlightedContents.set(
            incoming.map(category => ({ category, posts: signal([]) })) // Cria estrutura inicial para conteúdos
          );
        }),
        switchMap(categories => {
          if (categories.length === 0) {
            return of(null); // Emite valor vazio para quando não houver categorias
          }

          // Mapeia todas as categorias para obter os posts associados
          return forkJoin(
            categories.map((category, index) =>
              this.fetchPostsForCategory(category.id).pipe(
                tap(posts => this.highlightedContents()[index].posts.set(posts))
              )
            )
          );
        })
      )
      .subscribe({
        next: results => {
          if (!results) {
            // Caso nenhuma categoria exista
            this.loaderService.updateLoadingStatusOnEmptyResultAfterSeconds('highlightedCategories', false);
          } else {
            // Finaliza o carregamento ao concluir todas as requisições
            this.loaderService.updateLoadingStatus('highlightedCategories', false);
          }
        },
        error: () => {
          this.loaderService.updateLoadingStatus('highlightedCategories', false);
        },
      });
  }

  private getLatestPosts(): void{
    const LIMIT_OF_POSTS = 8;
    this.loaderService.updateLoadingStatus('latestPosts', true);
    this.latestPosts = this.postFacade.getLatestPosts(LIMIT_OF_POSTS);
    this.loaderService.changingLoadStatusAfterResult(this.latestPosts(), 'latestPosts');
  }

  private getContents(): void{

    const MAX_CATEGORIES_TO_DISPLAY: number = 8;
    const TOTAL_BLOCKS_PER_SECTION = 8;
    const midpoint = Math.floor(TOTAL_BLOCKS_PER_SECTION / 2);

    this.loaderService.updateLoadingStatus('posts', true);

    const categoriesToDisplay = this.categories().slice(0, MAX_CATEGORIES_TO_DISPLAY);

    this.contentBlocks = categoriesToDisplay.map(category => ({
      category,
      posts: signal([])
    }));

    forkJoin(
      categoriesToDisplay.map((category, index) =>
        this.fetchPostsForCategory(category.id).pipe(
          tap(posts => this.contentBlocks[index].posts.set(posts))
        )
      )
    ).subscribe({
      next: () => {
        if(this.contentBlocks.length > 0){
          // Após todas as requisições, divide os blocos
          
          const blocksBefore = this.contentBlocks.slice(0, midpoint);
          const blocksAfter = this.contentBlocks.slice(midpoint);
  
          this.blocksBeforeAdvertisement.set(blocksBefore);
          this.blocksAfterAdvertisement.set(blocksAfter);
  
          // Finaliza o carregamento
          this.loaderService.updateLoadingStatus('posts', false);
        } else {

          this.loaderService.updateLoadingStatusOnEmptyResultAfterSeconds('posts', false)

        }
      },
      error: () => {
        // Finaliza o carregamento em caso de erro
        this.loaderService.updateLoadingStatus('posts', false);
      }
    })

  }

}

export interface HighlightedContents{
  category: PostCategory,
  posts: WritableSignal<Post[]>
}