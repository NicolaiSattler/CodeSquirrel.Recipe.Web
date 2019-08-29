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
                //TODO: add Guard
            },
            {
                path: ':id',
                component: NecessityDetailComponent
                //TODO: add Guard
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class NecessityRoutingModule { }
