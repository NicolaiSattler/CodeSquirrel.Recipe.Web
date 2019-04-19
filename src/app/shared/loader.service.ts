import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class LoaderService {

    public showLoader: Subject<boolean>;

    constructor() {
        this.showLoader = new Subject<boolean>();

    }

    public show(showLoader: boolean): void {
        this.showLoader.next(showLoader);
    }
}
