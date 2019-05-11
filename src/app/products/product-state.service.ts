import { Injectable } from '@angular/core';
import { ProductHttpService } from '../shared/service/product.service';
import { IKeyValue } from '../model/keyvalue';
import { IProduct, Product } from '../model/product';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductStateService {
    private productCollection: IProduct[];
    private typeCollection: IKeyValue[];

    public editProduct: IProduct;

    constructor(private service: ProductHttpService) { }

    private removeItem(uniqueID: string): boolean {
        const p = this.productCollection.find(q => q.UniqueID === uniqueID);

        if (p && p != null){
            const index = this.productCollection.indexOf(p);
            const result = this.productCollection.splice(index, 1);

            if (result) {
                return true;
            }
        }
        return false;
    }

    public getProductTypes(): Observable<IKeyValue[]> {
        if (this.typeCollection == null) {
            return this.service.getProductTypes().pipe(tap(data => this.typeCollection = data));
        }

        return new Observable<IKeyValue[]>((observer) => {
            if (this.typeCollection && this.typeCollection.length === 0) {
                observer.error('There are no producttypes available');
                observer.complete();
            }

            observer.next(this.typeCollection);
            observer.complete();
        });
    }
    public getProductCollection(): Observable<IProduct[]> {
        if (this.productCollection == null) {
            return this.service.getProduct()
                .pipe(tap(data => this.productCollection = data));
        }

        return new Observable<IProduct[]>((observer) => {
            if (this.productCollection && this.productCollection.length === 0) {
                observer.error('There are no products available.')
                observer.complete();
            }

            observer.next(this.productCollection);
            observer.complete();
        });
    }
    public getProductByID(id: string): Observable<IProduct> {
        const result = this.productCollection.find(i => i.UniqueID === id);
        return of(result);
    }
    public isValidProductName$(name: string): Observable<boolean> {
        const result = this.isValidateProductName(name);
        return of(result);
    }
    public isValidateProductName(name: string): boolean {
        if (!this.productCollection) {
            return null;
        }
        return this.productCollection.find(p => p.Name === name && p.UniqueID !== this.editProduct.UniqueID) == null;
    }
    public createProduct(): Observable<IProduct> {
        return this.service.create();
    }
    public deleteProduct(uniqueID: string): Observable<{}> {
        return this.service.delete(uniqueID).pipe(
            tap(() => this.removeItem(uniqueID))
        );
    }
    public saveProduct(product: Product, isNew: boolean): Observable<Product> {
        if (isNew) {
            return this.service.insert(product).pipe(tap(() =>  this.productCollection.push(product)));
        } else {
            return this.service.update(product).pipe(
                tap(() => {
                    if (this.removeItem(product.UniqueID)) {
                        this.productCollection.push(product);
                    }
                })
            );
        }
    }
}
