import { Component, OnInit, KeyValueChanges, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from '../model/product';
import { IKeyValue } from '../model/keyvalue';
import { ProductStateService } from './product-state.service';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  host: {
    class: 'container'
  }
})
export class ProductDetailsComponent implements OnInit {
  private _pageTitle: string;
  private _errorMessage: string;
  private _isNew: boolean;
  private _isModified: boolean;
  private _product: Observable<IProduct>;
  private _productDiffer: KeyValueDiffer<string, any>;

  public get pageTitle() : string {
    return this._pageTitle;
  }
  public get product$() : Observable<IProduct>{
    return this._product;
  }
  public get productTypes() : IKeyValue[] {
    return this._service.ProductTypes;
  }
  public get isNew() : boolean { //TODO: does not work yet.. :()
    return this._isNew;
  }
  public get isModified() : boolean {
    return this._isModified;
  }

  constructor(private $route: ActivatedRoute, 
              private $router: Router,
              private $differs: KeyValueDiffers, 
              private _service : ProductStateService) { 
    this._pageTitle = "Product Details"
  }
  
  private initialize(id: any, isNew: any){
    if (id && isNew == 'false'){
      var result = this._service.getProductByID(id);
      
      if (result) {       
        this._product = result;
        this._productDiffer = this.$differs.find(this._product).create();
      }
      else {
        this._pageTitle = 'No product found...';  
      }

      return;
    }
    
    if (isNew == 'true'){
      var result = this._service.createProduct();
      this._pageTitle = 'Create a new product.';
      this._isNew = true;
      
      if (result){
        this._product = result; 
        this._productDiffer = this.$differs.find(this._product).create();
      }
    }
  }

  private productChanged(changes: KeyValueChanges<string, any>) {
    this._isModified = true;
  }

  public onBack() : void {
    this.$router.navigate(['/products']);
  }

  ngOnInit() : void {
    var id = this.$route.snapshot.paramMap.get('id');
    var isNew = this.$route.snapshot.paramMap.get('isnew');
    
    this.initialize(id, isNew);    
  }

  //TODO: https://netbasal.com/angular-2-improve-performance-with-trackby-cc147b5104e5
  ngDoCheck() : void {
    if (!this._productDiffer) return;
    
    const changes = this._productDiffer.diff(this._product);
    
    if (changes){
      this.productChanged(changes);
    }
  }
}
