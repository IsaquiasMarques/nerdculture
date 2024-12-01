import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AdvertisementClass } from '@core/classes/advertisement.class';
import { AdvertisementPage } from '@core/models/advertisement.model';
import { Post, PostCategory } from '@core/models/post.model';
import { PaginationService } from '@core/services/pagination.service';
import { AdvertisementsComponent } from '@shared/components/advertisements/advertisements.component';
import { HeroComponent } from '@shared/components/posts/hero/hero.component';
import { PostsContainerNoScrollComponent } from '@shared/components/posts/posts-container/no-scroll/posts-container-no-scroll.component';
import { CategoryFacade } from '@shared/facades/category.facade';
import { PostFacade } from '@shared/facades/post.facade';
import { Theme, ThemeService } from '@shared/services/theme.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [ HeroComponent, AdvertisementsComponent, PostsContainerNoScrollComponent ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent extends AdvertisementClass implements OnInit {
  
  private categoryFacade = inject(CategoryFacade);
  private postFacade = inject(PostFacade);
  private themeService = inject(ThemeService).changeTheme(Theme.WHITE);
  paginationService = inject(PaginationService);

  protected override page: AdvertisementPage = AdvertisementPage.BLOG_CATEGORY;
  categories: Signal<PostCategory[]> = signal([]);
  
  theCategory!: Signal<PostCategory | undefined>;

  private activatedRoute = inject(ActivatedRoute);
  public totalOfPostsPerPagination = 16;
  public current_page: number = 1;

  postsBeforeLevel1Advertisement: WritableSignal<Post[]> = signal([]);
  postsAfterLevel1Advertisement: WritableSignal<Post[]> = signal([]);

  ngOnInit(): void {
    this.getCategories();
    combineLatest([ this.activatedRoute.paramMap, this.activatedRoute.queryParamMap ]).subscribe(([paramMap, queryParams]) => {
      const category = paramMap.get('category');
      const currentPage = queryParams.get('page');
      this.theCategory = signal(this.categories().find(cat => cat.slug === category));
      this.current_page =  (currentPage) ? parseInt(currentPage) : 1;

      if(!this.theCategory()){
        return;
      }

      this.getPosts(this.theCategory()!.id, this.current_page);
    })
  }

  private getCategories(): void{
    this.categories = this.categoryFacade.all;
  }

  private getPosts(category_id: number, current_page: number): void{
    const LIMIT_OF_POSTS = 16;
    this.postFacade.getPostsByCategory(category_id, LIMIT_OF_POSTS, current_page, true).subscribe(incoming => {

      const posts = incoming;
      const midpoint = Math.floor(this.totalOfPostsPerPagination / 2);

      // Cria cópias do array ao invés de modificar o original
      const postsBefore = posts.slice(0, midpoint); // Pega os primeiros 'midpoint' itens
      const postsAfter = (posts.length <= midpoint) ? [] : posts.slice(midpoint); // Pega os itens restantes a partir de 'midpoint'

      // Atualiza as variáveis com as cópias dos arrays
      this.postsBeforeLevel1Advertisement.set(postsBefore);
      this.postsAfterLevel1Advertisement.set(postsAfter);

      // console.log(this.postsBeforeLevel1Advertisement(), this.paginationService.postsByCategoryTotalOfPosts$());

    });
  }

}
