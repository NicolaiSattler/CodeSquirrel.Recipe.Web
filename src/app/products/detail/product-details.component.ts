import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription} from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IProduct } from '../../model/product';
import { IKeyValue } from '../../model/keyvalue';
import { ProductStateService } from '../product-state.service';
import { ProductNameValidator } from './product-name-validator.directive';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  host: {class: 'container'}
})

export class ProductDetailsComponent implements OnInit, AfterViewInit {

  private nameValueControlSub: Subscription;
  private typeValueControlSub: Subscription;
  private productSub: Subscription;
  private saveProductSub: Subscription;
  private deleteProductSub: Subscription;
  private paramSub: Subscription;

  public pageTitle: string;
  public state: string;
  public isNew: boolean;
  public product: IProduct;
  public productTypes$: Observable<IKeyValue[]>;
  public nameErrorMessage: string;
  public typeErrorMessage: string;
  public productForm: FormGroup;
  public get nameControl(): AbstractControl {
    return this.productForm.get('Name');
  }
  public get typeControl(): AbstractControl {
    return this.productForm.get('Type');
  }
  public get perishabledControl(): AbstractControl {
    return this.productForm.get('Perishable');
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
              private service: ProductStateService) {
  }

  private initialize(product: IProduct, isNew: boolean) {
    this.product = product;
    this.isNew = isNew;
    this.productForm.setValue({
      Name: this.product.Name,
      Type: this.product.Type,
      Perishable: this.product.Perishable
    });

    if (isNew) {
      this.pageTitle = 'Create a new product.';
    } else {
      this.pageTitle = 'Product Details';
    }
  }
  private setNameErrorMessage(): void {
    this.nameErrorMessage = '';

    if ((this.nameControl.touched || this.nameControl.dirty) && this.nameControl.errors) {
      let aggrErrorMsg = '';
      Object.keys(this.nameControl.errors).map(key => aggrErrorMsg += this.nameValidationMessages[key]);

      this.nameErrorMessage = aggrErrorMsg;
    }
  }
  private setTypeErrorMessage(): void {
    if ((this.typeControl.touched || this.typeControl.dirty) && this.typeControl.errors) {
      let aggrErrorMsg = '';
      Object.keys(this.typeControl.errors).map(key => aggrErrorMsg += this.typeValidationMessages[key]);

      this.typeErrorMessage = aggrErrorMsg;
    }
  }
  private navigateToProductList(): void {
    this.$router.navigate(['/products'], { queryParamsHandling: 'preserve' });
  }
  private undefinedProductTypeValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return control.value === '0' ? { 'undefined': true } : null;
    };
  }
  public onSave(): void {
    if (this.productForm.valid && this.productForm.dirty) {
      const p = { ...this.product, ...this.productForm.value };

      this.saveProductSub = this.service.saveProduct(p, this.isNew)
        .subscribe(result => {
          if (result) {
            this.state = 'The product has been saved.';
            this.productForm.reset();
            this.navigateToProductList();
          } else  {
            this.state = 'The product could not be saved.';
          }
        },
        (error: any) => this.state = <string>error
      );
    }
  }
  public onRemove(): void {
    if (confirm('Are you sure you want to the delete this item?')) {
      this.deleteProductSub = this.service.deleteProduct(this.product.UniqueID)
        .subscribe(() => this.navigateToProductList());
    }
  }
  public onBack(): void {
    this.navigateToProductList();
  }

  ngOnInit(): void {
    this.paramSub = this.$route.paramMap.subscribe(params => {
      const id = params.get('id');
      const isNew = params.get('isnew') === 'true';

      this.productTypes$ = this.service.getProductTypes();
      this.productForm = this.$formBuilder.group({
        Name: [null, { asyncValidators: [this._nameValidator.validate.bind(this._nameValidator)], updateOn: 'blur'}],
        Type: [null, [Validators.required, this.undefinedProductTypeValidator()]],
        Perishable: [null, [Validators.nullValidator]]
      });

      this.nameControl.setValidators([Validators.required, Validators.maxLength(256)]);
      this.nameValueControlSub = this.nameControl.valueChanges
        .pipe(debounceTime(200))
        .subscribe(value => this.setNameErrorMessage());
      this.typeValueControlSub = this.typeControl.valueChanges
        .subscribe(value => this.setTypeErrorMessage());

      if (isNew) {
        this.productSub = this.service.createProduct()
          .subscribe((product: IProduct) => {
            this.initialize(product, isNew);
          });
      } else {
        this.productSub = this.service.getProductByID(id)
          .subscribe((product: IProduct) => this.initialize(product, isNew));
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.isNew) {
      this.nameControl.updateValueAndValidity();
      this.typeControl.updateValueAndValidity();
      this.perishabledControl.updateValueAndValidity();
    }
  }
  OnDestroy(): void {
    if (this.nameValueControlSub) {
      this.nameValueControlSub.unsubscribe();
    }

    if (this.typeValueControlSub) {
      this.typeValueControlSub.unsubscribe();
    }

    if (this.productSub) {
        this.productSub.unsubscribe();
    }

    if (this.saveProductSub) {
      this.saveProductSub.unsubscribe();
    }
    if (this.deleteProductSub) {
      this.deleteProductSub.unsubscribe();
    }

    this.paramSub.unsubscribe();
  }
}
