import { Directive, ElementRef, HostListener, input, signal, Signal, WritableSignal } from "@angular/core";

@Directive()
export class ScrollerFunctionalities{
    private initialX: number | null = null;
    private initialY: number | null = null;
    
    protected activeIndex: WritableSignal<number> = signal(0);
    protected itemsArray: Signal<any[]> = signal([]);

    scrollerElementRef!: ElementRef<HTMLElement>;
    limitedContainerElementRef!: ElementRef<HTMLElement>;
    
    withPaddingSpacing: boolean = true;
    paddingX: WritableSignal<number> = signal(0);

    touchMove = input<boolean>(true);

    ngAfterViewInit(): void {
        this.bootstrap();
        this.valueToPadding();
    }

    protected bootstrap(){}
    
    @HostListener('window:resize', ['$event']) onResize(){
        this.valueToPadding();
    }

    protected valueToPadding(){
        if(!this.withPaddingSpacing) return;
        this.paddingX.update(val => val = this.limitedContainerElementRef.nativeElement.offsetLeft);
    }

    updateActiveIndex(value: number): void{
        this.activeIndex.update(val => val = value);
    }
    
    next(){
        if(this.activeIndex() === this.itemsArray().length - 1){
            return;
        }else{
            this.updateActiveIndex(this.activeIndex() + 1);
        }
        this.scrollToActiveIndex(this.activeIndex());
    }

    prev(){
        if(this.activeIndex() === 0){
            return;
        }else { 
            this.updateActiveIndex(this.activeIndex() - 1);
        }
        this.scrollToActiveIndex(this.activeIndex());
    }

    slideTo(index: number){
        this.updateActiveIndex(index);
        this.scrollToActiveIndex(this.activeIndex());
    }
    
    scrollToActiveIndex(activeIndex: number){
        let CONTAINER_INDEX = 0;
        let scrollerElementRefChildrensAsHtmlElement = this.scrollerElementRef.nativeElement.childNodes[CONTAINER_INDEX] as HTMLElement;
        let getActiveItemByActiveIndexAsHtmlElement = scrollerElementRefChildrensAsHtmlElement.children[activeIndex] as HTMLElement;
        this.scrollerElementRef.nativeElement.scrollTo(getActiveItemByActiveIndexAsHtmlElement.offsetLeft - this.paddingX(), 0)
    }

    @HostListener('touchstart', ['$event'])
    public captureInitialXOnTouchStart($event: any){
        if(!this.touchMove()) return;
        
        this.initialX = $event.touches[0].clientX;
        this.initialY = $event.touches[0].clientY;
    }

    @HostListener('touchmove', ['$event'])
    public carouselTouchMoveEventHandler($event: any){

        if(!this.touchMove()) return;

        if(this.initialX === null || this.initialY === null) return;
        var currentX = $event.touches[0].clientX;
        var currentY = $event.touches[0].clientY;

        var deltaX = currentX - this.initialX;
        var deltaY = currentY - this.initialY;

        if(Math.abs(deltaX) > Math.abs(deltaY)){
            // $event.preventDefault();
            if(deltaX < 0){
                this.next();
            }else{
                this.prev();
            }
        }

        this.initialX = null;
        this.initialY = null;

    }

    // @HostListener('wheel', ['$event'])
    // public carouselWheelEventHandler($event: any){        
    //     this.initialX = $event.clientX;
    //     this.initialY = $event.clientY;
        
    //     if(this.initialX === null || this.initialY === null) return;

    //     var deltaX = $event.deltaX;
    //     var deltaY = $event.deltaY;

    //     if(Math.abs(deltaX) > Math.abs(deltaY)){
    //         $event.preventDefault();
    //         if(deltaX > 0){
    //             // this.next();
    //         }else{
    //             // this.prev();
    //         }
    //     }

    //     this.initialX = null;
    //     this.initialY = null;
    // }
}