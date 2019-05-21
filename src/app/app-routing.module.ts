import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './common/welcome/welcome.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { CustomPreloadStrategy } from './shared/service/custom-preload-stratagy.service';

@NgModule({
  declarations: [
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent },
        {
          path: 'products',
          loadChildren: './products/product.module#ProductModule',
          data: { preload: true }
        },
        { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        { path: '**', component: PageNotFoundComponent }
      ],
      {
        enableTracing: false,
        preloadingStrategy: CustomPreloadStrategy
      })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
