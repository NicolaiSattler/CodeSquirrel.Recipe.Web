import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
  
  private nameValueControlSubscriber: Subscription;
 
  public pageTitle: string;
  public product$: Observable<IProduct>
  public productTypes$ : Observable<IKeyValue[]>
  public isNew : boolean;
  public state : string;
  public nameErrorMessage : string;
  public productForm: FormGroup;
  public get nameControl() : AbstractControl {
    return this.productForm.get('nameControl');
  }
  public get typeControl() : AbstractControl { 
    return this.productForm.get('typeControl');
  }
  public get nameValidationMessages() : any {
    return {
      required: "Please enter a product name.",
      maxLength: "The product name is to long (256)."
    }
  }
  
  constructor(private $route: ActivatedRoute, 
              private $router: Router,
              private $formBuilder: FormBuilder,
              private _service : ProductStateService) {

    this.pageTitle = "Product Details"
  } 
  
  private initialize(id: any){
    this.productTypes$ = this._service.getProductTypes();

    if (id && !this.isNew){
      let result = this._service.getProductByID(id);
      
      if (result) {       
        this.product$ = result;
        this.populateData();
      }
      else {
        this.pageTitle = 'No product found...';  
      }
      return;
    }
    
    if (this.isNew) {
      let result = this._service.createProduct();
      this.pageTitle = 'Create a new product.';
      
      if (result){
        this.product$ = result; 
        this.populateData();
      }
    }
  }
  private populateData() : void {
    let subscriber = this.product$.subscribe((product) => {
      this.productForm.setValue({
        nameControl: product.Name,
        typeControl: product.Type,
        perishableControl: product.Perishable
      });
    });

    subscriber.unsubscribe();
  }
  private setNameErrorMessage(value: string): void {
    this.nameErrorMessage = '';
    if ((this.nameControl.touched || this.nameControl.dirty) && this.nameControl.errors){
      this.nameErrorMessage = Object.keys(this.nameControl.errors)
                                    .map(key => this.nameErrorMessage += this.nameValidationMessages[key])
                                    .join(' ');
    }
  }
  private navigateToProductList() : void {
    this.$router.navigate(['/products']);
  }
  public onSave() : void {
    let productSub = this._product.subscribe(product => { 
      let saveProductSub = this._service.saveProduct(product, this.isNew)
                   .subscribe(result => {
                     if (result == true){
                       this._state = "The product has been saved."
                      } else this._state = "The product could not be saved."
                   });
      saveProductSub.unsubscribe();
    });

    productSub.unsubscribe();
  }
  public onRemove() : void {
  }
  public onBack() : void {
    this.navigateToProductList(); 
  }

  ngOnInit() : void {
    let id = this.$route.snapshot.paramMap.get('id');  
    let isNewParam = this.$route.snapshot.paramMap.get('isnew');
    
    this.isNew = isNewParam == 'true' ? true : false;
    this.productForm = this.$formBuilder.group({
      nameControl: ['', [Validators.required, Validators.maxLength(256)]],
      typeControl: ['', [Validators.required]],
      perishableControl: false
    });

    this.nameValueControlSubscriber = this.nameControl.valueChanges.subscribe(value => this.setNameErrorMessage(value));
     
    this.initialize(id);    
  }
  ngOnDestroy() : void {
    this.nameValueControlSubscriber.unsubscribe();
  }
}
