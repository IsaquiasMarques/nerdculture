import { Component, computed, effect, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdvertisementClass } from '@core/classes/advertisement.class';
import { AdvertisementPage } from '@core/models/advertisement.model';
import { Post, PostCategory } from '@core/models/post.model';
import { CategoryFacade } from '@shared/facades/category.facade';
import { Theme, ThemeService } from '@shared/services/theme.service';
import { HeroComponent } from '../views/hero/hero.component';
import { HighlightedCategoriesComponent } from '../views/highlighted-categories/highlighted-categories.component';
import { PostFacade } from '@shared/facades/post.facade';
import { Observable } from 'rxjs';
import { LatestPostsComponent } from '../views/latest-posts/latest-posts.component';
import { AdvertisementsComponent } from '@shared/components/advertisements/advertisements.component';

@Component({
  selector: 'app-contents',
  standalone: true,
  imports: [ HeroComponent, HighlightedCategoriesComponent, LatestPostsComponent, AdvertisementsComponent ],
  templateUrl: './contents.component.html',
  styleUrl: './contents.component.css'
})
export class ContentsComponent extends AdvertisementClass implements OnInit {

  constructor(){
    super();
  }

  protected override page: AdvertisementPage = AdvertisementPage.BLOG;
  private themeService = inject(ThemeService).changeTheme(Theme.WHITE);

  private categoryFacade = inject(CategoryFacade);
  private postFacade = inject(PostFacade);

  categories: Signal<PostCategory[]> = signal([]);
  private highlightedCategories: Signal<PostCategory[]> = signal([]);
  latestPosts: Signal<Post[]> = signal([]);

  highlightedContents: HighlightedContents[] = [];

  contentBlocks: HighlightedContents[] = [];
  blocksBeforeAdvertisement: WritableSignal<HighlightedContents[]> = signal([]);
  blocksAfterAdvertisement: WritableSignal<HighlightedContents[]> = signal([]);

  ngOnInit(): void {
    this.getCategories();
    this.getHighlightedCategories();
    this.getLatestPosts();
    this.getContents();
  }

  // Método para buscar os posts de uma categoria
  private fetchPostsForCategory(category_id: number): Observable<Post[]> {
    return this.postFacade.getPostsByCategory(category_id, 5, 1); // Substitua pela sua lógica de requisição
  }

  private getCategories(): void{
    this.categories = this.categoryFacade.all;
  }

  private getHighlightedCategories(): void{
    this.highlightedCategories = this.categoryFacade.highlightedCategories;

    this.highlightedCategories().forEach((category, index) => {
      this.highlightedContents.push({ category: category, posts: signal([]) });
      this.fetchPostsForCategory(category.id).subscribe(incomingPosts => {
        this.highlightedContents[index].posts.set(incomingPosts);
      } );
    });
  }

  private getLatestPosts(): void{
    const LIMIT_OF_POSTS = 8;
    this.latestPosts = this.postFacade.getLatestPosts(LIMIT_OF_POSTS);
  }

  private getContents(): void{
    const MAX_CATEGORIES_TO_DISPLAY: number = 8;
    const categories: Signal<PostCategory[]> = computed(() => {
      return this.categoryFacade.all().slice(0, MAX_CATEGORIES_TO_DISPLAY);
    });

    categories().forEach((category, index) => {
      this.contentBlocks.push({ category: category, posts: signal([]) });
      this.fetchPostsForCategory(category.id).subscribe(incomingPosts => {
        this.contentBlocks[index].posts.set(incomingPosts);
      } );
    });

    const totalOfBlocksPerSection: number = 8;
    const midpoint = Math.floor(totalOfBlocksPerSection / 2);

    // Cria cópias do array ao invés de modificar o original
    const blocksBefore = this.contentBlocks.slice(0, midpoint); // Pega os primeiros 'midpoint' itens
    const blocksAfter = (this.contentBlocks.length <= midpoint) ? [] : this.contentBlocks.slice(midpoint); // Pega os itens restantes a partir de 'midpoint'

    // Atualiza as variáveis com as cópias dos arrays
    this.blocksBeforeAdvertisement.set(blocksBefore);
    this.blocksAfterAdvertisement.set(blocksAfter);

  }

}

export interface HighlightedContents{
  category: PostCategory,
  posts: WritableSignal<Post[]>
}