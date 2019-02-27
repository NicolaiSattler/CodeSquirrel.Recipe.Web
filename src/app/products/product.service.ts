import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IProduct, Product } from '../model/product';
import { IKeyValue } from '../model/keyvalue';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private _rootUrl: string;
    private _getAllUrl: string;
    private _getByIDUrl : string;
    private _getTypes : string;
    private _typeCollection : IKeyValue[];

    constructor(private client: HttpClient) {
        this._rootUrl = 'http://localhost:5000/api/'
        this._getAllUrl = 'Product/GetAll';
        this._getByIDUrl = 'Product/GetByID';
        this._getTypes = 'Product/GetTypes';
    }

    public getProduct() : Observable<Product[]>{
        var url = `${this._rootUrl}${this._getAllUrl}`;
        return this.client.get<Product[]>(url).pipe(
            //tap --> look at values emitted in the stream without transforming the stream
            //tap(data => console.log('All: ' + JSON.stringify(data))), 
            catchError(this.handleError)
        );
    }

    public getProductByID(id: string) : Observable<IProduct>{
        var url = `${this._rootUrl}${this._getByIDUrl}`;
        return this.client.get<Product>(url, { params: { "productID" : id} })
                        .pipe(catchError(this.handleError));
    }

    public getProductTypes(): IKeyValue[] {
        if (this._typeCollection == null){
            var url = `${this._rootUrl}${this._getTypes}`;
            this.client.get<IKeyValue[]>(url)
                        .pipe(catchError(this.handleError))
                        .subscribe(result => {
                            this._typeCollection = result;
                        });
        }

        return this._typeCollection;
    }

    private handleError(response: HttpErrorResponse){
        var errorMessage = '';
        var errEvent = response.error;

        if (errEvent instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${errEvent.message}`;
        } else {
            errorMessage = `Server returned code: ${response.status}, error message: ${response.message}`;
        }

        console.error(errorMessage);

        return throwError(errorMessage);
    }
}