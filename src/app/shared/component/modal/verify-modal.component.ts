import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-verify-modal',
  templateUrl: './verify-modal.component.html',
  styleUrls: ['./verify-modal.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class VerifyModalComponent {

  public title: string;
  public question: string;

  constructor(config: NgbModalConfig, private modal: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  public open(title: string, question: string, content?: any): boolean {
    this.title = title;
    this.question = question;

    let dialogResult = false;

    this.modal.open(content, { centered: true, size: 'sm'}).result.then(result => {
      dialogResult = result === 'Yes';
    }).catch (reason => {
      console.log(`DialogModal error: ${reason}`);
      dialogResult = false;
    });

    return dialogResult;
  }
}
