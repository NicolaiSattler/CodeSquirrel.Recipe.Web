import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Necessity } from 'src/app/model/necessity';


@Injectable({ providedIn: 'root' })
export class NecessityHttpService {
    private rootUrl: string;
    private getAllUrl: string;
    private getCreateUrl: string;
    private getByIDUrl: string;
    private insertUrl: string;
    private updateUrl: string;
    private deleteUrl: string;

    constructor(private $client: HttpClient) {
        this.rootUrl = 'http://localhost:5000/api/';
        this.getAllUrl = 'Necessity/GetAll';
        this.getCreateUrl = 'Necessity/Create';
        this.getByIDUrl = 'Necessity/GetByID';
        this.insertUrl = 'Necessity/Insert';
        this.updateUrl = 'Necessity/Update';
        this.deleteUrl = 'Necessity/Delete';
    }

    private handleError(response: HttpErrorResponse) {
        let errorMessage = '';
        const errEvent = response.error;

        if (errEvent instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${errEvent.message}`;
        } else {
            errorMessage = `Server returned code: ${response.status}, error message: ${response.message}`;
        }

        console.error(errorMessage);

        return throwError(errorMessage);
    }
    public create(): Observable<Necessity> {
        const url = `${this.rootUrl}${this.getCreateUrl}`;
        return this.$client.get<Necessity>(url)
                           .pipe(catchError(this.handleError));
    }
    public get(): Observable<Necessity[]> {
        const url = `${this.rootUrl}${this.getAllUrl}`;
        return this.$client.get<Necessity[]>(url)
                           .pipe(catchError(this.handleError));
    }
    public getByID(id: string): Observable<Necessity> {
        const url = `${this.rootUrl}${this.getByIDUrl}`;
        return this.$client.get<Necessity>(url, { params: { 'necessityID' : id} })
                           .pipe(catchError(this.handleError));
    }
    public insert(necessity: Necessity): Observable<Necessity> {
        const url = `${this.rootUrl}${this.insertUrl}`;
        return this.$client.post<Necessity>(url, necessity)
                           .pipe(catchError(this.handleError));
    }
    public update(necessity: Necessity): Observable<Necessity> {
        const url = `${this.rootUrl}${this.updateUrl}`;
        return this.$client.post<Necessity>(url, necessity)
                           .pipe(catchError(this.handleError));
    }
    public delete(uniqueID: string): Observable<{}> {
        const url = `${this.rootUrl}${this.deleteUrl}`;
        return this.$client.post<string>(url, uniqueID)
                           .pipe(catchError(this.handleError));
    }
}
