import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductOverviewComponent } from './overview/product-overview.component';
import { ProductCanActivateGuard } from './detail/product-detail-activate.guard';
import { ProductDetailsComponent } from './detail/product-details.component';
import { ProductCanDeactivateGuard } from './detail/product-detail-deactivate.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
          path: '',
          component: ProductOverviewComponent
        },
        {
          path: ':id',
          canActivate: [ ProductCanActivateGuard ],
          canDeactivate: [ProductCanDeactivateGuard],
          component: ProductDetailsComponent
        }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRoutingModule { }
