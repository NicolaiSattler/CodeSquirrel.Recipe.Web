import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VerifyMessage } from 'src/app/model/verifymessage';
import { VerifyModalComponent } from './verify-modal.component';

@Injectable({
    providedIn: 'root'
})
export class VerifyModalService {

    constructor(private service: NgbModal) { }

    public verify(vm: VerifyMessage,
                  acceptBtnText: string = 'Yes',
                  declineBtnText: string = 'No',
                  modalSize: 'sm'|'lg' = 'lg'): Promise<any> {
        const modal = this.service.open(VerifyModalComponent, { size: modalSize, backdrop: 'static', centered: true, keyboard: false });
        const component = modal.componentInstance as VerifyModalComponent;
        component.caption = vm.caption;
        component.message = vm.message;
        component.acceptButtonText = acceptBtnText;
        component.declineButtonText = declineBtnText;

        return modal.result;
    }
}
