import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdvertisementClass } from '@core/classes/advertisement.class';
import { AdvertisementPage } from '@core/models/advertisement.model';
import { PostCategory } from '@core/models/post.model';
import { CategoryFacade } from '@shared/facades/category.facade';
import { Theme, ThemeService } from '@shared/services/theme.service';
import { HeroComponent } from '../views/hero/hero.component';

@Component({
  selector: 'app-contents',
  standalone: true,
  imports: [ HeroComponent ],
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

  categories: Signal<PostCategory[]> = signal([]);

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void{
    this.categories = this.categoryFacade.all;
  }

}
