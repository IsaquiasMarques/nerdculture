import { Component, inject, OnInit } from '@angular/core';
import { LoaderExtender } from '@core/classes/loader-extender.class';
import { SearchFacade } from '@search/facades/search.facade';
import { PostsContainerNoScrollComponent } from '@shared/components/posts/posts-container/no-scroll/posts-container-no-scroll.component';

@Component({
  selector: 'app-contents',
  standalone: true,
  imports: [ PostsContainerNoScrollComponent ],
  templateUrl: './contents.component.html',
  styleUrl: './contents.component.css'
})
export class ContentsComponent extends LoaderExtender implements OnInit {
  public searchFacade = inject(SearchFacade);

  ngOnInit(): void {
    this.searchFacade.changeOption('contents');
  }

}
