import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductModule } from './products/product.module';

import { LoaderService } from './shared/loader.service';
import { LoadSpinnerComponent } from './ui/load-spinner/load-spinner.component';
import { LoadSpinnerOverlayComponent } from './ui/load-spinner-overlay/load-spinner-overlay.component';

@NgModule({
  providers: [
    //LoaderService
  ],
  declarations: [
    AppComponent,
    LoadSpinnerComponent,
    LoadSpinnerOverlayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProductModule,
    //Should always be last due to the routing..
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
