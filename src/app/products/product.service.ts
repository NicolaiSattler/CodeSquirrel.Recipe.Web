import { Injectable } from '@angular/core';
import { IProduct } from '../model/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private _rootUrl: string;
    private _getAllUrl: string;
    private _getByIDUrl : string;

    constructor(private client: HttpClient) {
        this._rootUrl = 'http://localhost:5000/api/'
        this._getAllUrl = 'Product/GetAll';
        this._getByIDUrl = 'Product/GetByID';        
    }

    public getProduct() : Observable<IProduct[]>{
        var url = `${this._rootUrl}${this._getAllUrl}`;
        return this.client.get<IProduct[]>(url).pipe(
            //tap --> look at values emitted in the stream without transforming the stream
            //tap(data => console.log('All: ' + JSON.stringify(data))), 
            catchError(this.handleError)
        );
    }

    public getProductByID(id: string) : Observable<IProduct>{
        var url = `${this._rootUrl}${this._getByIDUrl}`;
        return this.client.get<IProduct>(url, { params: { "productID" : id} })
                        .pipe(catchError(this.handleError));
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