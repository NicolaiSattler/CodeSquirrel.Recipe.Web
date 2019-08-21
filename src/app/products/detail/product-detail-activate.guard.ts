import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductDetailComponent } from './product-detail.component';

@Injectable({
  providedIn: 'root'
})
export class ProductCanActivateGuard implements CanActivate {
  private guidRegex = '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';

  public component: ProductDetailComponent;
  public route: ActivatedRouteSnapshot;

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const regex = new RegExp(this.guidRegex);
    const id = next.params.id;
    const isValidID = regex.test(id);
    let isNew =  false;

    if (next.params.isnew) {
      isNew = next.params.isnew === 'true';
    }

    const canRoute = (isValidID || isNew);

    if (!canRoute) {
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}
