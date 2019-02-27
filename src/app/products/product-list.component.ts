import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product, IProduct } from '../model/product';
import { ProductService } from './product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    host: {
        class: 'container'
    }
})

export class ProductListComponent implements OnInit {
    private _pageTitle: string;
    private _needle: string;
    private _productCollection : Product[];
    private _filteredCollection : Product[];
    private _errorMessage: any;

    constructor(private _service : ProductService) {
        this._pageTitle = 'Product Overzicht';
    }

    public get pageTitle() : string {
        return this._pageTitle;
    }
    public get productCollection() : Product[] {
        return this._productCollection;
    }
    public get filteredCollection(): Product[]{
        return this._filteredCollection;
    }
    public get needle() : string {
        return this._needle;
    }
    public set needle(value : string){
        this._needle = value;
        this._filteredCollection = this._needle 
            ? this.filter(this._needle) 
            : this.productCollection;
    }

    private filter(needle: string) : Product[]{
        needle = needle.toLocaleLowerCase();
        return this._productCollection.filter((product: IProduct) => product.Name.toLocaleLowerCase().indexOf(needle) !== -1);
    }
    public Add(): void {
        
    }
    public Edit(): void {
        
    }
    public Remove(): void {
        
    }

    ngOnInit(): void {
       this._service.getProduct().subscribe(
           result => 
           {
               this._productCollection = result
               this._filteredCollection = this._productCollection;
           }, 
           error => this._errorMessage = <any>error
        );
    }
}