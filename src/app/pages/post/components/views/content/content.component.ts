import { NgClass } from '@angular/common';
import { Component, computed, inject, input, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '@core/models/post.model';
import { SubscribeFacade } from '@post/facades/subscribe.facade';
import { PostTemplate } from '@shared/templates/post/post.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

  incomingThePost = input.required<Post[]>(); 
  thePost: Signal<Post> = computed(() => this.incomingThePost()[0]);

  isLoading = input<boolean>(false);
  contentPlaceholderGroupLength = input<number>(8);
  contentPlaceholderGroupArray = computed(() => Array.from({ length: this.contentPlaceholderGroupLength() }));

}