import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProductListComponent } from './product-list.component';
import { ProductDetailsComponent } from './product-details.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductStateService } from './product-state.service';

import { ConvertToSpacePipe } from '../pipes/convert-to-space.pipe';
import { LoaderService } from '../shared/loader.service';



@NgModule({
  declarations: [
    ConvertToSpacePipe,
    ProductListComponent,
    ProductDetailsComponent
  ],
  providers: [
    ProductStateService,
    LoaderService
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
