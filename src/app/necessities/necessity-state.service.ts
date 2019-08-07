import { Injectable } from '@angular/core';
import { NecessityHttpService } from '../shared/service/necessity-http.service';
import { INecessity } from '../model/necessity';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NecessityStateService {
    private necessityCollection: INecessity[];

    constructor(private service: NecessityHttpService) { }

    public getNecessityCollection(): Observable<INecessity[]> {
        if (this.necessityCollection == null) {
            return this.service.get()
                .pipe(tap(data => this.necessityCollection = data));
        }

        return new Observable<INecessity[]>((observer) => {
            if (this.necessityCollection && this.necessityCollection.length === 0) {
                observer.error('There are no necessities available.');
                observer.complete();
            }

            observer.next(this.necessityCollection);
            observer.complete();
        });
    }
}