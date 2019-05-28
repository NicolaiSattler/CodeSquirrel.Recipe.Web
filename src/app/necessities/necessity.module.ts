import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NecessityOverviewComponent } from './overview/necessity-overview.component';
import { NecessityRoutingModule } from './necessity-routing.module';

@NgModule({
    declarations: [
      NecessityOverviewComponent
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
