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
  private _state: string;
  private _isNew: boolean;
  private _isModified: boolean;
  private _isSaving: boolean;
  private _isSaved: boolean;
  private _hasError: boolean;
  private _product: Observable<IProduct>;
  //private _productDiffer: KeyValueDiffer<string, any>;
  private _productTypes: Observable<IKeyValue[]>;

  public get pageTitle() : string {
    return this._pageTitle;
  }
  public get product$() : Observable<IProduct>{
    return this._product;
  }
  public get productTypes$() : Observable<IKeyValue[]> {
    return this._productTypes;
  }
  public get errorMessage(): string {
    return this._errorMessage;
  }
  public set errorMessage(v : string){
    this._errorMessage = v;
    if (v && v != ''){
      this._hasError = true;
    }
  }
  public get isNew() : boolean {
    return this._isNew;
  }
  public get isModified() : boolean {
    return this._isModified;
  }
  public get hasError(): boolean{
    return this._hasError;
  }
  public get isSaving() : boolean {
    return this._isSaving;
  }
  public get isSaved() : boolean {
    return this._isSaved;
  }
  public get state() : string {
    return this._state;
  }

  constructor(private $route: ActivatedRoute, 
              private $router: Router,
              //private $differs: KeyValueDiffers, 
              private _service : ProductStateService) {


    //Lees het volgende artikel
    //https://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/




    //https://medium.com/@amcdnl/reactive-angular-forms-with-ngrx-533a2f28c127     



    this._pageTitle = "Product Details"
  }
  
  private initialize(id: any){
    this._productTypes = this._service.getProductTypes();

    if (id && !this._isNew){
      var result = this._service.getProductByID(id);
      
      if (result) {       
        this._product = result;
        //this._productDiffer = this.$differs.find(this._product).create();
      }
      else {
        this._pageTitle = 'No product found...';  
      }
      return;
    }
    
    if (this._isNew) {
      var result = this._service.createProduct();
      this._pageTitle = 'Create a new product.';
      this._isNew = true;
      
      if (result){
        this._product = result; 
        //this._productDiffer = this.$differs.find(this._product).create();
      }
    }
  }
  private navigateToProductList() : void {
    this.$router.navigate(['/products']);
  }
  // private productChanged(changes: KeyValueChanges<string, any>) {
  //   this._isModified = true;
  // }
  public changeName(value : any) : void {
    console.log("Name is:" + value);
  }
  public changeType(value : any) : void {
    console.log("Type is:" + value);
  }

  public onSave() : void {
    this._isSaving = true;

    var productSub = this._product.subscribe(product => { 
      var saveProductSub = this._service.saveProduct(product, this.isNew)
                   .subscribe(result => {
                     if (result == true){
                       this._state = "The product has been saved."
                       this._isSaved = true;
                      } else this._state = "The product could not be saved."
                      this._isSaving = false;
                   }, error => this.errorMessage = error);
      saveProductSub.unsubscribe();
    }, error => this.errorMessage = error);

    productSub.unsubscribe();
  }
  public onRemove() : void {
  }
  public onBack() : void {
    this.navigateToProductList(); 
  }

  ngOnInit() : void {
    var id = this.$route.snapshot.paramMap.get('id');
    
    var isNewParam = this.$route.snapshot.paramMap.get('isnew');

    this._isNew = isNewParam == 'true' ? true : false;
    
    this.initialize(id);    
  }
  //TODO: https://netbasal.com/angular-2-improve-performance-with-trackby-cc147b5104e5
  // ngDoCheck() : void {
  //   if (!this._productDiffer) return;
    
  //   const changes = this._productDiffer.diff(this._product);
    
  //   if (changes){
  //     this.productChanged(changes);
  //   }
  // }
}
