import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductOverviewComponent } from './overview/product-overview.component';
import { ProductCanActivateGuard } from './detail/product-detail-activate.guard';
import { ProductDetailComponent } from './detail/product-detail.component';
import { ProductCanDeactivateGuard } from './detail/product-detail-deactivate.guard';
import { ProductOverviewCanDeactivateGuard } from './overview/product-overview.component.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
          path: '',
          component: ProductOverviewComponent,
          canDeactivate: [ProductOverviewCanDeactivateGuard]
        },
        {
          path: ':id',
          canActivate: [ ProductCanActivateGuard ],
          canDeactivate: [ProductCanDeactivateGuard],
          component: ProductDetailComponent
        }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRoutingModule { }
