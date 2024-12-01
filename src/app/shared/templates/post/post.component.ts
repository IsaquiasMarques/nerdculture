import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '@core/models/post.model';
import { FriendlyFormatPipe } from '@shared/pipes/friendly-format.pipe';
import { CardDimentionsDirective } from './directive/card-dimentions.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-post-template',
  standalone: true,
  imports: [ RouterLink, FriendlyFormatPipe, CardDimentionsDirective, NgClass ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostTemplate {
  post = input.required<Post>();
  responsive = input.required<boolean>();
  dimentions = input.required<string[]>();
  
  templateSize = input<'long' | 'short' | 'mixed'>('long');
}
