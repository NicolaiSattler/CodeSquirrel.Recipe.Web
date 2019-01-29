import { Injectable } from '@angular/core';
import { IProduct } from '../model/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl: string

    constructor(private client: HttpClient) {
        this.productUrl = 'http://localhost:5000/api/Product/GetAll'        
    }

    public getProduct() : Observable<IProduct[]>{
        return this.client.get<IProduct[]>(this.productUrl).pipe(
            //tap --> look at values emitted in the stream without transforming the stream
            //tap(data => console.log('All: ' + JSON.stringify(data))), 
            catchError(this.handleError)
        );
    }

    private handleError(response: HttpErrorResponse){
        var errorMessage = '';
        var errEvent = response.error;

        if (errEvent instanceof ErrorEvent)
        {
            errorMessage = `An error occurred: ${errEvent.message}`;
        } else {
            errorMessage = `Server returned code: ${response.status}, error message: ${response.message}`;
        }

        console.error(errorMessage);

        return throwError(errorMessage);
    }
}