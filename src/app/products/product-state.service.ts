import { Injectable } from '@angular/core';
import { ProductHttpService } from '../shared/product.service';
import { IKeyValue } from '../model/keyvalue';
import { Product, IProduct } from '../model/product';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ProductStateService {

    private _errorMessage: string;
    private _productCollection : Product[];
    private _typeCollection : IKeyValue[];

    constructor(private _service: ProductHttpService){
        
    }

    public get ProductTypes(): IKeyValue[] {

        if (this._typeCollection == null) {
            this._service.getProductTypes()
                         .subscribe(result => this._typeCollection = result,
                                    error => this._errorMessage = <any>error);
        }

        return this._typeCollection;
    }

    public getProductCollection() : Observable<Product[]> {
        if (this._productCollection == null){
            return this._service.getProduct()
                                .pipe(tap(data => this._productCollection = data));
        }

        return new Observable<Product[]>((observer) => {
            if (this._productCollection && this._productCollection.length == 0){
                observer.error("There are no products available.")
                observer.complete();
            }

            observer.next(this._productCollection);
            observer.complete();
        });
    }

    public createProduct() : Observable<IProduct>{
        return this._service.create();
    }
    public getProductByID(id: string) {
        return new Observable<IProduct>((observer) => {
            var result = this._productCollection.find(i => i.UniqueID === id);
            observer.next(result);
            observer.complete();
        })
    }
    
    // public createProduct() : IProduct {
    //     var result = null;
    //     this._service.create().subscribe(response => result = response,
    //                                      error => this._errorMessage = <any>error);
    //     return result;
    // }
    // public getProductByID(id : string) : IProduct {
    //     if (this._productCollection){
    //        return this._productCollection.find(i => i.UniqueID === id);
    //     }

    //     return null;
    // }
}