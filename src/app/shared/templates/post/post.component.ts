import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '@core/models/post.model';
import { FriendlyFormatPipe } from '@shared/pipes/friendly-format.pipe';

@Component({
  selector: 'app-post-template',
  standalone: true,
  imports: [ RouterLink, FriendlyFormatPipe ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostTemplate {
  post = input.required<Post>();
  templateSize = input<'long' | 'short'>('long');
}
