import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProductOverviewComponent } from './product-overview.component';

@Injectable({ providedIn: 'root' })
export class ProductOverviewCanDeactivateGuard implements CanDeactivate<ProductOverviewComponent> {

  canDeactivate(component: ProductOverviewComponent): boolean {
      return !component.isLoading;
  }
}
