import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NecessityOverviewComponent } from './overview/necessity-overview.component';
import { NecessityDetailComponent } from './detail/necessity-detail.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: NecessityOverviewComponent
            },
            {
                path: ':id',
                component: NecessityDetailComponent
              }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class NecessityRoutingModule { }
