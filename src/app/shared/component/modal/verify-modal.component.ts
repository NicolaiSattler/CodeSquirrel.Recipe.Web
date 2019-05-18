import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-verify-modal',
  templateUrl: './verify-modal.component.html',
  styleUrls: ['./verify-modal.component.css']
})
export class VerifyModalComponent {

  @Input()caption: string;
  @Input()message: string;
  @Input()acceptButtonText: string;
  @Input()declineButtonText: string;

  constructor(private activeModal: NgbActiveModal) { }

  public decline(): void {
    this.activeModal.close(false);
  }
  public accept(): void {
    this.activeModal.close(true);
  }
}
