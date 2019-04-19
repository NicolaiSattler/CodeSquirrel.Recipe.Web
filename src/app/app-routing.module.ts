import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './common/welcome/welcome.component';

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent },
        { path: 'products', loadChildren: './products/product.module#ProductModule' },
        { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        //{ path: '**', component: PageNotFoundComponent }
      ],
      {
        //  enableTracing: true
      })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
