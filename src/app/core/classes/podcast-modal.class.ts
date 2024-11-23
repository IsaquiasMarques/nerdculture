import { Directive, signal } from "@angular/core";

@Directive()
export class PodcastModalSupporter{
    showModalBackground = signal(false);
    firstTimeOpeningModal = signal(true);
    constructor(){ }

    toggleOverflowHiddenBodyElement(value: boolean){}

}