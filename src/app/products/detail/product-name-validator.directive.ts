import { Injectable, Directive, forwardRef } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidator, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductStateService } from '../product-state.service';

@Injectable({ providedIn: 'root' })

export class ProductNameValidator implements AsyncValidator {
    constructor(private service: ProductStateService) {}

    public validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
        return this.service.getProductByName$(control.value).pipe(
            map(result => (result == null ? null : { uniqueName: true} ))
        );
    }
}

@Directive({
    selector: '[appUniqueName]',
    providers: [
      {
        provide: NG_ASYNC_VALIDATORS,
        useExisting: forwardRef(() => ProductNameValidator),
        multi: true
      }
    ]
  })
  export class ProductNameValidatorDirective {
    constructor(private validator: ProductNameValidator) {}

    validate(control: AbstractControl) {
      this.validator.validate(control);
    }
  }
