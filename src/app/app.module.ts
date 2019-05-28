import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoadSpinnerComponent } from './shared/component/load-spinner/load-spinner.component';
import { LoadSpinnerOverlayComponent } from './shared/component/load-spinner-overlay/load-spinner-overlay.component';
import { VerifyModalComponent } from './shared/component/modal/verify-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadSpinnerComponent,
    LoadSpinnerOverlayComponent,
    VerifyModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [VerifyModalComponent]
})
export class AppModule { }
