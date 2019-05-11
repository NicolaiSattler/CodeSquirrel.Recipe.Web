import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SortableTableHeaderDirective } from '../shared/directive/sortable-table-header.directive';

import { ProductOverviewComponent } from './overview/product-overview.component';
import { ProductDetailsComponent } from './detail/product-details.component';
import { ProductRoutingModule } from './product-routing.module';
import { ModalModule } from '../shared/component/modal/modal.module';


@NgModule({
  declarations: [
    ProductOverviewComponent,
    ProductDetailsComponent,
    SortableTableHeaderDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    NgbModule,
    ModalModule
  ],
  bootstrap: [ ProductOverviewComponent ]
})
export class ProductModule { }
