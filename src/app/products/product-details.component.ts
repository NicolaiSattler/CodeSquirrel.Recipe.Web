import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription} from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IProduct } from '../model/product';
import { IKeyValue } from '../model/keyvalue';
import { ProductStateService } from './product-state.service';
import { ProductNameValidator } from './product-name-validator.directive';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  host: {class: 'container'}
})

export class ProductDetailsComponent implements OnInit {

  private nameValueControlSub: Subscription;
  private typeValueControlSub: Subscription;
  private productSub: Subscription;


  public pageTitle: string;
  public state: string;
  public isNew: boolean;
  public product: IProduct;
  public productTypes$: Observable<IKeyValue[]>;
  public nameErrorMessage: string;
  public typeErrorMessage: string;
  public productForm: FormGroup;
  public get nameControl(): AbstractControl {
    return this.productForm.get('nameControl');
  }
  public get typeControl(): AbstractControl {
    return this.productForm.get('typeControl');
  }
  public get perishabledContro(): AbstractControl {
    return this.productForm.get('perishabledControl');
  }
  public get nameValidationMessages(): any {
    return {
      required: 'Please enter a product name.',
      maxlength: 'The product name is too long (256).',
      uniqueName: 'The product name is not unique.'
    };
  }
  public get typeValidationMessages(): any {
    return {
      required: 'Please enter a product type.',
      undefined: 'Please supply a product type.'
    };
  }

  constructor(private $route: ActivatedRoute,
              private $router: Router,
              private $formBuilder: FormBuilder,
              private _nameValidator: ProductNameValidator,
              private _service: ProductStateService) {
  }

  private initialize(product: IProduct, isNew: boolean) {
    this.product = product;
    this.isNew = isNew;

    if (isNew) {
      this.pageTitle = 'Create a new product.';
    } else {
      this.pageTitle = 'Product Details';
    }
    this.productForm.setValue({
      nameControl: this.product.Name,
      typeControl: this.product.Type,
      perishableControl: this.product.Perishable
    });
  }
  private setNameErrorMessage(): void {
    if ((this.nameControl.touched || this.nameControl.dirty) && this.nameControl.errors) {
      let aggrErrorMsg = '';
      Object.keys(this.nameControl.errors).map(key => aggrErrorMsg += this.nameValidationMessages[key]);

      this.nameErrorMessage = aggrErrorMsg;
    }
  }
  private setTypeErrorMessage(): void{
    if ((this.typeControl.touched || this.typeControl.dirty) && this.typeControl.errors) {
      let aggrErrorMsg = '';
      Object.keys(this.typeControl.errors).map(key => aggrErrorMsg += this.typeValidationMessages[key]);

      this.typeErrorMessage = aggrErrorMsg;
    }
  }
  private navigateToProductList(): void {
    this.$router.navigate(['/products']);
  }
  private undefinedProductTypeValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return control.value === '0' ? { 'undefined': true } : null;
    };
  }
  public onSave(): void {
    const saveProductSub = this._service.saveProduct(this.product, this.isNew)
                  .subscribe(result => {
                    if (result === true) {
                      this.state = 'The product has been saved.';
                    } else  {
                      this.state = 'The product could not be saved.';
                    }
                  });
    saveProductSub.unsubscribe();
  }
  public onRemove(): void {
  }
  public onBack(): void {
    this.navigateToProductList();
  }

  ngOnInit(): void {
    const id = this.$route.snapshot.paramMap.get('id');
    const isNew = this.$route.snapshot.paramMap.get('isnew') === 'true';

    this.productTypes$ = this._service.getProductTypes();
    this.productForm = this.$formBuilder.group({
      nameControl: [null,
                   { asyncValidators: [this._nameValidator.validate.bind(this._nameValidator)], updateOn: 'blur'}],
      typeControl: [null, [Validators.required, this.undefinedProductTypeValidator()]],
      perishableControl: false
    });

    this.nameControl.setValidators([Validators.required, Validators.maxLength(256)]);
    this.nameValueControlSub = this.nameControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe(value => this.setNameErrorMessage());
    this.typeValueControlSub = this.typeControl.valueChanges
      .subscribe(value => this.setTypeErrorMessage());

    if (isNew) {
      this.productSub = this._service.createProduct()
        .subscribe((product: IProduct) => {
          this.initialize(product, isNew);
        });
    } else {
      this.productSub = this._service.getProductByID(id)
        .subscribe((product: IProduct) => this.initialize(product, isNew));
    }
  }

  OnDestroy(): void {
    this.nameValueControlSub.unsubscribe();
    this.productSub.unsubscribe();
  }
}
