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
    private rootUrl: string;
    private getAllUrl: string;
    private getCreateUrl: string;
    private getByIDUrl: string;
    private getTypesUrl: string;
    private insertUrl: string;
    private updateUrl: string;
    private deleteUrl: string;

    constructor(private $client: HttpClient) {
        this.rootUrl = 'http://localhost:5000/api/'
        this.getAllUrl = 'Product/GetAll';
        this.getCreateUrl = 'Product/Create';
        this.getByIDUrl = 'Product/GetByID';
        this.getTypesUrl = 'Product/GetTypes';
        this.insertUrl = 'Product/Insert';
        this.updateUrl = 'Product/Update';
        this.deleteUrl = 'Product/Delete';
    }

    public getProduct(): Observable<Product[]>{
        const url = `${this.rootUrl}${this.getAllUrl}`;
        return this.$client.get<Product[]>(url)
            .pipe(catchError(this.handleError));
    }
    public create(): Observable<IProduct> {
        const url = `${this.rootUrl}${this.getCreateUrl}`;
        return this.$client.get<IProduct>(url)
            .pipe( catchError(this.handleError));

    }
    public getProductByID(id: string): Observable<IProduct> {
        const url = `${this.rootUrl}${this.getByIDUrl}`;
        return this.$client.get<Product>(url, { params: { 'productID' : id} })
            .pipe(catchError(this.handleError));
    }
    public getProductTypes(): Observable<IKeyValue[]> {
        const url = `${this.rootUrl}${this.getTypesUrl}`;
        return this.$client.get<IKeyValue[]>(url)
            .pipe(catchError(this.handleError));
    }
    public insert(product: Product): Observable<Product> {
        const url = `${this.rootUrl}${this.insertUrl}`;
        return this.$client.post<Product>(url, product)
            .pipe(catchError(this.handleError));
    }
    public update(product: Product): Observable<Product> {
        const url = `${this.rootUrl}${this.updateUrl}`;
        return this.$client.post<Product>(url, product)
            .pipe(catchError(this.handleError));
    }
    public delete(uniqueID: string): Observable<{}> {
        const url = `${this.rootUrl}${this.deleteUrl}`;
        return this.$client.post<string>(url, uniqueID)
            .pipe(catchError(this.handleError));
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
}