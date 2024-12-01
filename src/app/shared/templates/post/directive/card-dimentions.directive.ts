import { AfterViewInit, Directive, ElementRef, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCardDimentions]',
  standalone: true
})
export class CardDimentionsDirective implements AfterViewInit {
    dimentions = input.required<string[]>();

    constructor(private el: ElementRef, private renderer2: Renderer2){ }

    ngAfterViewInit(): void {
        // Getting the first child (hero-container element) because Angular recognizes app-hero as the Host of dimentions signal
        const child = (this.el.nativeElement as HTMLElement).firstElementChild;
        this.dimentions().forEach(classItem => {
            this.renderer2.addClass(child, classItem)
        })
    }
}
