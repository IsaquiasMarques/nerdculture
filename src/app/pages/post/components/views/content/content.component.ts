import { NgClass } from '@angular/common';
import { Component, computed, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '@core/models/post.model';
import { SubscribeFacade } from '@post/facades/subscribe.facade';
import { PostTemplate } from '@shared/templates/post/post.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ PostTemplate, ReactiveFormsModule, NgClass ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {

  private subscribeFacade = inject(SubscribeFacade);

  content = input.required<string>();
  excludePost = input.required<number>();
  latestPosts = input.required<Post[]>();
  dimentions = input<string[]>(['w-[278px]', 'xs:w-[300px]'])
  filteredPosts = computed(() => this.latestPosts().filter(p => p.id !== this.excludePost()));

  subscribingFormGroup!: FormGroup;

  subscribing: WritableSignal<boolean> = signal(false);
  subscribeResponseStatus: WritableSignal<ResposeStatus> = signal(null);

  ngOnInit(): void {
    this.subscribingFormGroup = new FormGroup({
      'email': new FormControl('', [ Validators.required, Validators.email ])
    });
  }

  submit(): void{
    if(this.subscribingFormGroup.invalid) return;
    let subscriber = {
      email: this.subscribingFormGroup.get('email')?.value,
      status: 'confirmed',
      lists: [1]
    };
    this.isSubscribing(true);
    this.subscribeFacade.subscribe(subscriber).subscribe({
      next: (response) => {
        this.changesubscribeStatus((response.id) ? 200 : 401);
        this.isSubscribing(false);
        this.subscribingFormGroup.reset();
        this.resetsubscribeResponseStatusAfter()
      },
      error: (error) => {
        this.changesubscribeStatus(error.code);
        this.isSubscribing(false);
        this.resetsubscribeResponseStatusAfter()
      }
    });

  }

  isSubscribing(status: boolean): void{
    this.subscribing.update(value => value = status);
  }

  changesubscribeStatus(code: ResposeStatus): void{
    this.subscribeResponseStatus.update(val => val = code);
  }

  resetsubscribeResponseStatusAfter(seconds: number = 3): void{
    let timeout = setTimeout(() => {
      this.subscribeResponseStatus.update(val => val = null);
      clearTimeout(timeout);
    }, seconds * 1000);
  }

}

type ResposeStatus = null | 200 | 400 | 500 | 401 | 405;