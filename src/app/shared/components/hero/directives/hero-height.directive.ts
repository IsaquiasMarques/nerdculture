import { AfterViewInit, computed, Directive, ElementRef, HostBinding, HostListener, input, Renderer2, Signal } from "@angular/core";

@Directive({
    selector: '[appHeroHeight]',
    standalone: true
})
export class HeroHeightDirective implements AfterViewInit {
    heightInput = input<string[]>(['h-[90vh]']);

    constructor(private el: ElementRef, private renderer2: Renderer2){ }

    ngAfterViewInit(): void {
        // Getting the first child (hero-container element) because Angular recognizes app-hero as the Host of heightInput signal
        const child = (this.el.nativeElement as HTMLElement).firstElementChild;
        this.heightInput().forEach(classItem => {
            this.renderer2.addClass(child, classItem)
        })
        // this.renderer2.setStyle(child, 'height', this.heightInput())
    }

}