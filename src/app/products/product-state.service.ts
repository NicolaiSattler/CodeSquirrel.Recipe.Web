import { Injectable } from '@angular/core';
import { ProductHttpService } from '../shared/product.service';
import { IKeyValue } from '../model/keyvalue';
import { Product, IProduct } from '../model/product';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ProductStateService {
    private _productCollection : IProduct[];
    private _typeCollection : IKeyValue[];

    constructor(private _service: ProductHttpService) { }

    public getProductTypes(): Observable<IKeyValue[]> {
        if (this._typeCollection == null) {
            return this._service.getProductTypes().pipe(tap(data => this._typeCollection = data));
        }

        return new Observable<IKeyValue[]>((observer) => {
            if (this._typeCollection && this._typeCollection.length == 0){
                observer.error("There are no producttypes available");
                observer.complete();
            }
            
            observer.next(this._typeCollection);
            observer.complete();
        });
    }
    public getProductCollection() : Observable<IProduct[]> {
        if (this._productCollection == null){
            return this._service.getProduct()
                                .pipe(tap(data => this._productCollection = data));
        }

        return new Observable<IProduct[]>((observer) => {
            if (this._productCollection && this._productCollection.length == 0){
                observer.error("There are no products available.")
                observer.complete();
            }

            observer.next(this._productCollection);
            observer.complete();
        });
    }
    public getProductByID(id: string) {
        return new Observable<IProduct>((observer) => {
            var result = this._productCollection.find(i => i.UniqueID === id);
            observer.next(result);
            observer.complete();
        })
    }
    public createProduct() : Observable<IProduct>{
        return this._service.create();
    }
    public saveProduct(product: IProduct, isNew: boolean) : Observable<boolean> {
        if (isNew) {
            var insertAction = this._service.insert(product);
            insertAction.subscribe(result => {
                if (result == true){
                    this._productCollection.push(product);
                }
            })

            return insertAction;

        } else return this._service.update(product);
    }
}