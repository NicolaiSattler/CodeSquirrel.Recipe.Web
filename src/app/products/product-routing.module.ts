import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductCanActivateGuard } from './product-detail-activate.guard';
import { ProductDetailsComponent } from './product-details.component';
import { ProductCanDeactivateGuard } from './product-detail-deactivate.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'products',
        children: [
          {
            path: '',
            component: ProductListComponent
          },
          {
            path: ':id',
            canActivate: [ ProductCanActivateGuard ],
            canDeactivate: [ProductCanDeactivateGuard],
            component: ProductDetailsComponent
           }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRoutingModule { }
