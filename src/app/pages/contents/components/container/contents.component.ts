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

@Component({
  selector: 'app-contents',
  standalone: true,
  imports: [ HeroComponent, HighlightedCategoriesComponent ],
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

  highlightedContents: HighlightedContents[] = [];

  ngOnInit(): void {
    this.getCategories();
    this.getHighlightedCategories();
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

}

export interface HighlightedContents{
  category: PostCategory,
  posts: WritableSignal<Post[]>
}