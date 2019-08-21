import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription} from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IProduct } from '../../model/product';
import { IKeyValue } from '../../model/keyvalue';
import { ProductStateService } from '../product-state.service';
import { ProductNameValidator } from './product-name-validator.directive';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  host: {class: 'container'}
})

export class ProductDetailComponent implements OnInit, OnDestroy, AfterViewInit {
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
  public productFormGroup: FormGroup;
  public get nameControl(): AbstractControl {
    return this.productFormGroup.get('Name');
  }
  public get typeControl(): AbstractControl {
    return this.productFormGroup.get('Type');
  }
  public get perishabledControl(): AbstractControl {
    return this.productFormGroup.get('Perishable');
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
  public get saveButtonTooltip(): string {
    return "Opslaan naar de database.";
  }
  public get saveButtonDisabledTooltip(): string {
    return "Uitgeschakeld totdat het formulier valide is.";
  }


  constructor(private $route: ActivatedRoute,
              private $router: Router,
              private $formBuilder: FormBuilder,
              private nameValidator: ProductNameValidator,
              private stateService: ProductStateService) {
  }

  private initialize(product: IProduct, isNew: boolean) {
    this.product = product;
    this.isNew = isNew;
    this.productFormGroup.setValue({
      Name: this.product.Name,
      Type: this.product.Type,
      Perishable: this.product.Perishable
    });

    if (isNew) {
      this.pageTitle = 'Maak een nieuwe product aan';
    } else {
      this.pageTitle = 'Product gegevens';
    }
  }
  private initializeForm(): void {
    this.productFormGroup = this.$formBuilder.group({
      Name: [null, { asyncValidators: [this.nameValidator.validate.bind(this.nameValidator)], updateOn: 'blur'}],
      Type: [null, [Validators.required, this.undefinedProductTypeValidator()]],
      Perishable: [null, [Validators.nullValidator]]
    });

    this.nameControl.setValidators([Validators.required, Validators.maxLength(256)]);
    this.nameValueControlSub = this.nameControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe(value => this.setNameErrorMessage());
    this.typeValueControlSub = this.typeControl.valueChanges
      .subscribe(value => this.setTypeErrorMessage());
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
    if (this.productFormGroup.valid && this.productFormGroup.dirty) {
      const p = { ...this.product, ...this.productFormGroup.value };

      this.saveProductSub = this.stateService.saveProduct$(p, this.isNew)
        .subscribe(result => {
          if (result) {
            this.state = 'The product has been saved.';
            this.productFormGroup.reset();
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
      this.deleteProductSub = this.stateService.deleteProduct$(this.product.UniqueID)
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

      this.productTypes$ = this.stateService.getProductTypes$();
      
      this.initializeForm();

      if (isNew) {
        this.productSub = this.stateService.createProduct$()
          .subscribe((product: IProduct) => {
            this.initialize(product, isNew);
          });
      } else {
        this.productSub = this.stateService.getProductByID$(id)
          .subscribe((product: IProduct) => {
            this.stateService.editProduct = product;
            this.initialize(product, isNew);
          });
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
  
  ngOnDestroy(): void {
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
