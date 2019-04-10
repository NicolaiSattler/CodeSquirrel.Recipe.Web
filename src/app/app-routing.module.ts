import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './common/welcome/welcome.component';

const routes = [ { path: 'welcome', component: WelcomeComponent },
                 { path: '', redirectTo: 'welcome', pathMatch: 'full'},
                 //TODO: replace with 404 page
                 //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,
       {
        //  enableTracing: true
       })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
