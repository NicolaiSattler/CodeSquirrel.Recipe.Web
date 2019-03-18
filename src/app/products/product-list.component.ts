import { Component, OnInit } from '@angular/core';
import { IProduct } from '../model/product';
import { ProductStateService } from './product-state.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    host: { class: 'container' }
})

export class ProductListComponent implements OnInit {
    private _pageTitle: string;
    private _needle: string;
    private _isReady: boolean;
    private _selectAllChecked: boolean;
    private _productCollection$ : Observable<IProduct[]>;
    private _filterProductCollection$ : Observable<IProduct[]>;
    private _stateMessage: any;

    constructor(private $router: Router, private _service : ProductStateService) {
        this._pageTitle = 'Product Overzicht';
        this._stateMessage =  'Loading...';
    }

    public get pageTitle(): string {
        return this._pageTitle;
    }
    public get selectAllChecked(): boolean {
        return this._selectAllChecked;
    }
    public set selectAllChecked(v: boolean) {
        this._selectAllChecked = v;
    }
    public get isReady(): boolean {
        return this._isReady;
    }
    public get stateMessage(): string {
        return this._stateMessage;
    }
    public get productCollection$(): Observable<IProduct[]> {
        return this._productCollection$;
    }
    public get filterProductCollection$(): Observable<IProduct[]> {
        return this._filterProductCollection$;
    }
    public set filterProductCollection$(v: Observable<IProduct[]>) {
        this._filterProductCollection$ = v;
        this._isReady = true;
    }
    public get needle(): string {
        return this._needle;
    }
    public set needle(value: string) {
        this._needle = value;
        this.filter(this._needle);
    }

    private filter(needle: string): void {
        const cleanNeedle = needle.toLocaleLowerCase();
        this.filterProductCollection$ = this.productCollection$.pipe(
            map(products => products.filter(p => p.Name.toLocaleLowerCase().indexOf(cleanNeedle) !== -1)));
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
        this._productCollection$ = this._service.getProductCollection();
        this.filterProductCollection$ = this._productCollection$;
    }
}
