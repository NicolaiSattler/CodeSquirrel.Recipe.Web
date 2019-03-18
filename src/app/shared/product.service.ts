import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IProduct, Product } from '../model/product';
import { IKeyValue } from '../model/keyvalue';

@Injectable({
    providedIn: 'root'
})
export class ProductHttpService {
    private _rootUrl: string;
    private _getAllUrl: string;
    private _getCreateUrl: string;
    private _getByIDUrl: string;
    private _getTypesUrl: string;
    private _insertUrl: string;
    private _updateUrl: string;

    constructor(private $client: HttpClient) {
        this._rootUrl = 'http://localhost:5000/api/'
        this._getAllUrl = 'Product/GetAll';
        this._getCreateUrl = 'Product/Create';
        this._getByIDUrl = 'Product/GetByID';
        this._getTypesUrl = 'Product/GetTypes';
        this._insertUrl = 'Product/Insert';
        this._updateUrl = 'Product/Update';
    }

    public getProduct() : Observable<Product[]>{
        const url = `${this._rootUrl}${this._getAllUrl}`;
        return this.$client.get<Product[]>(url)
            .pipe(catchError(this.handleError));
    }
    public create(): Observable<IProduct> {
        const url = `${this._rootUrl}${this._getCreateUrl}`;
        return this.$client.get<IProduct>(url)
            .pipe( catchError(this.handleError));

    }
    public getProductByID(id: string) : Observable<IProduct>{
        const url = `${this._rootUrl}${this._getByIDUrl}`;
        return this.$client.get<Product>(url, { params: { 'productID' : id} })
            .pipe(catchError(this.handleError));
    }
    public getProductTypes(): Observable<IKeyValue[]> {
        const url = `${this._rootUrl}${this._getTypesUrl}`;
        return this.$client.get<IKeyValue[]>(url)
            .pipe(catchError(this.handleError));
    }
    public insert(product: IProduct): Observable<boolean> {
        const url = `${this._rootUrl}${this._insertUrl}`;
        return this.$client.post<boolean>(url, product)
            .pipe(catchError(this.handleError));
    }
    public update(product: IProduct):Observable<boolean> {
        const url = `${this._rootUrl}${this._updateUrl}`;
        return this.$client.post<boolean>(url, product)
            .pipe(catchError(this.handleError));
    }

    private handleError(response: HttpErrorResponse){
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
}