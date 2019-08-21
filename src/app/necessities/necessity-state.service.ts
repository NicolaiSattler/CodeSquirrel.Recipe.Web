import { Injectable } from '@angular/core';
import { NecessityHttpService } from '../shared/service/necessity-http.service';
import { INecessity } from '../model/necessity';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NecessityStateService {
    
    private necessityCollection: INecessity[];

    public editNecessity: INecessity;

    constructor(private service: NecessityHttpService) { }

    public getNecessityCollection$(): Observable<INecessity[]> {
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
    public getNecessityByID$(uniqueID: string): Observable<INecessity> {
        if (this.necessityCollection && this.necessityCollection.length > 0){
            const result = this.necessityCollection.find(q => q.UniqueID === uniqueID);
            return of(result);
        }
        return this.service.getByID(uniqueID);
    }

    public createNecessity$(): Observable<INecessity> {
        return this.service.create();
    }
}