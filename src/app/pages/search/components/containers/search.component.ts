import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoaderExtender } from '@core/classes/loader-extender.class';
import { SearchFacade } from '@search/facades/search.facade';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ ReactiveFormsModule, NgClass, RouterOutlet, RouterLink, RouterLinkActive ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent extends LoaderExtender implements OnInit, OnDestroy {
  searchFormGroup!: FormGroup;
  searching: WritableSignal<boolean> = signal(false);

  searchfacade = inject(SearchFacade);

  ngOnInit(): void {
    this.searchFormGroup = new FormGroup({
      'term': new FormControl('', [ Validators.required ])
    });
  }

  ngOnDestroy(): void {
    this.searchfacade.cleanResults();
  }

  changeOption(option: 'contents' | 'podcasts'): void{
    this.searchfacade.changeOption(option);
    this.searchFormGroup.reset();
    this.searchfacade.cleanResults();
  }

  submitForm(): void{
    if(this.searchFormGroup.invalid) return;

    switch(this.searchfacade.option()){
      case 'contents':
          this.searchPosts();
        break;
      case 'podcasts':
        this.searchPodcasts();
        break;
    }

  }

  searchPosts(): void{
    this.loaderService.updateLoadingStatus('searchPosts', true)
    this.searchfacade.searchPosts(this.searchFormGroup.get('term')?.value).pipe(take(1)).subscribe({
      next: (incoming) => {
        this.loaderService.changingLoadStatusAfterResult(incoming, 'searchPosts')
      }
    });
  }

  searchPodcasts(): void{
    this.loaderService.updateLoadingStatus('searchPodcasts', true)
    this.searchfacade.searchPodcasts(this.searchFormGroup.get('term')?.value).pipe(take(1)).subscribe({
      next: (incoming) => {
        this.loaderService.changingLoadStatusAfterResult(incoming, 'searchPodcasts')
      }
    });
  }

}
