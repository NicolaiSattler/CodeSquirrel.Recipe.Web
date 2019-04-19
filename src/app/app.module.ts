import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoaderService } from './shared/loader.service';
import { LoadSpinnerComponent } from './ui/load-spinner/load-spinner.component';
import { LoadSpinnerOverlayComponent } from './ui/load-spinner-overlay/load-spinner-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadSpinnerComponent,
    LoadSpinnerOverlayComponent
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
