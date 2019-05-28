import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NecessityOverviewComponent } from './overview/necessity-overview.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: NecessityOverviewComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class NecessityRoutingModule { }
