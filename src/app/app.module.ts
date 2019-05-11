import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoadSpinnerComponent } from './shared/component/load-spinner/load-spinner.component';
import { LoadSpinnerOverlayComponent } from './shared/component/load-spinner-overlay/load-spinner-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadSpinnerComponent,
    LoadSpinnerOverlayComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
