import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { VerifyModalService } from 'src/app/shared/component/modal/verify-modal.service';
import { VerifyMessage } from 'src/app/model/verifymessage';

@Injectable({ providedIn: 'root' })
export class ProductCanDeactivateGuard implements CanDeactivate<ProductDetailComponent> {

  constructor(private service: VerifyModalService) { }

  canDeactivate(component: ProductDetailComponent): Promise<boolean> {
    if (component.productFormGroup.dirty) {
      const vm = new VerifyMessage();
      vm.caption = 'Er zijn wijziging';
      vm.message = 'Wilt u de wijzigingen opslaan?';

      const result = this.service.verify(vm);
      result.then(result => {
        if (result === true) {
          component.onSave();
        }
      });

      return result;
    } else {
      return new Promise<boolean>((resolve, reject) => { resolve(true); });
    }
  }
}
