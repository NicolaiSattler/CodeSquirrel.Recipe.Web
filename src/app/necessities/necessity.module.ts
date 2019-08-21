import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NecessityOverviewComponent } from './overview/necessity-overview.component';
import { NecessityDetailComponent } from './detail/necessity-detail.component';
import { NecessityRoutingModule } from './necessity-routing.module';

@NgModule({
    declarations: [
      NecessityOverviewComponent,
      NecessityDetailComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModule,
      NecessityRoutingModule
    ]
  })
  export class NecessityModule { }
