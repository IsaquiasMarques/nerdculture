import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'urlSanitizer',
  standalone: true
})
export class UrlSanitizerPipe implements PipeTransform {

  constructor( private sanitizer: DomSanitizer ){}

  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
