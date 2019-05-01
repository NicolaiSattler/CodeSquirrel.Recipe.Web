import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IKeyValue } from '../model/keyvalue';
import { IProduct } from '../model/product';
import { ProductStateService } from './product-state.service';
import { LoaderService } from '../shared/loader.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    host: { class: 'container' }
})

export class ProductListComponent implements OnInit, AfterContentInit, OnDestroy {
    private productTypeSub: Subscription;
    private queryParamSub: Subscription;

    private _filterProductCollection$: Observable<IProduct[]>;
    private _needle: string;

    public pageTitle: string;
    public stateMessage: string;
    public selectAllChecked: boolean;
    public isReady: boolean;
    public productTypes: IKeyValue[];
    public productCollection$: Observable<IProduct[]>;
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

    constructor(private $activatedRoute: ActivatedRoute,
                private $router: Router,
                private productService: ProductStateService,
                private loaderService: LoaderService) {
        this.pageTitle = 'Product Overzicht';
    }

    private filter(needle: string): void {
        const cleanNeedle = needle.toLocaleLowerCase();
        this.filterProductCollection$ = this.productCollection$.pipe(
            map(products => products.filter(p => p.Name.toLocaleLowerCase().indexOf(cleanNeedle) !== -1)));
    }

    public getTypeFlag(key: string): string {
        const item = this.productTypes.find(kv => kv.Key === +key);
        return item.Value;
    }
    public Add(): void {
        this.$router.navigate(['/products', 0, { isnew: true } ], { queryParams : { filterBy: this.needle } });
    }
    public Remove(): void {

    }
    public SelectRow(index: any): void {
        console.log("rowindex:" + index);
    }
    public SelectAll(): void {
    }

    ngOnInit(): void {
        this.loaderService.show(true);
    }

    ngAfterContentInit(): void {
        let needle = '';

        this.queryParamSub = this.$activatedRoute.queryParamMap.subscribe(map => {
            needle = map.get('filterBy');
        });


        this.productTypeSub = this.productService.getProductTypes()
                                                 .subscribe((result) => {
                this.productTypes = result;
                this.productCollection$ = this.productService.getProductCollection();
                this.filterProductCollection$ = this.productCollection$;
                if (needle !== null) {
                    this.needle = needle;
                }
                this.loaderService.show(false);
            },
            (error) => {
                this.stateMessage = error;
                this.loaderService.show(false);
            });
    }

    ngOnDestroy(): void {
        this.productTypeSub.unsubscribe();
        this.queryParamSub.unsubscribe();
    }
}
