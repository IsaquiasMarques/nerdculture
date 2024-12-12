import { Directive, inject } from "@angular/core";
import { LoaderContainer, LoaderService } from "@core/services/loader.service";

@Directive()
export class LoaderExtender{
    public loaderService = inject(LoaderService);
}