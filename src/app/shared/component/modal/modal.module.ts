import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { VerifyModalComponent } from './verify-modal.component';

@NgModule({
  imports: [NgbModule],
  declarations: [VerifyModalComponent],
  exports: [VerifyModalComponent],
  bootstrap: [VerifyModalComponent]
})
export class ModalModule {}
