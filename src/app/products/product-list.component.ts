import { Component, OnInit } from '@angular/core';
import { IProduct } from '../model/product';
import { ProductStateService } from './product-state.service';
import { Observable, Subscription, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IKeyValue } from '../model/keyvalue';
import { IPromise } from 'q';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    host: { class: 'container' }
})

export class ProductListComponent implements OnInit {
    private typeFlagSub: Subscription;

    private _filterProductCollection$: Observable<IProduct[]>;
    private _needle: string;

    public pageTitle: string;
    public selectAllChecked: boolean;
    public isReady: boolean ;
    public stateMessage: string;
    public productCollection$: Observable<IProduct[]>;
    public productTypes$: Observable<IKeyValue[]>;
    public get filterProductCollection$(): Observable<IProduct[]> {
        return this._filterProductCollection$;
    }
    public set filterProductCollection$(v: Observable<IProduct[]>) {
        this._filterProductCollection$ = v;
        this.isReady = true;
    }
    public get needle(): string {
        return this._needle;
    }
    public set needle(value: string) {
        this._needle = value;
        this.filter(this._needle);
    }

    constructor(private $router: Router, private service: ProductStateService) {
        this.pageTitle = 'Product Overzicht';
        this.stateMessage =  'Loading...';
    }

    private filter(needle: string): void {
        const cleanNeedle = needle.toLocaleLowerCase();
        this.filterProductCollection$ = this.productCollection$.pipe(
            map(products => products.filter(p => p.Name.toLocaleLowerCase().indexOf(cleanNeedle) !== -1)));
    }

    //TODO: hoe dan wel? :(
    public getTypeFlag(key: string): Promise<string> {
        return this.productTypes$.toPromise().then(data => {
            const p = data.find(i => i.Key === +key);
            return p.Value;
        });
    }
    public Add(): void {
        this.$router.navigate(['products', '', true]);
    }
    public Remove(): void {

    }
    public SelectRow(uniqueID: string): void {

    }
    public SelectAll(): void {
    }

    ngOnInit(): void {
        this.productTypes$ = this.service.getProductTypes();
        this.productCollection$ = this.service.getProductCollection();
        this.filterProductCollection$ = this.productCollection$;
    }
}
