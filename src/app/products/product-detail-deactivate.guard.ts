import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProductDetailsComponent } from './product-details.component';

@Injectable({
  providedIn: 'root'
})
export class ProductCanDeactivateGuard implements CanDeactivate<ProductDetailsComponent> {

  constructor() { }

  canDeactivate(component: ProductDetailsComponent): boolean {
    if (component.productForm.dirty) {
        return confirm('Do you wish to disregard all changes?');
    }
    return true;
  }
}
