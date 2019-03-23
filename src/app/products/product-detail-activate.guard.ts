import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductDetailsComponent } from './product-details.component';

@Injectable({
  providedIn: 'root'
})
export class ProductCanActivateGuard implements CanActivate {
  private guidRegex = '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';

  public component: ProductDetailsComponent;
  public route: ActivatedRouteSnapshot;

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const regex = new RegExp(this.guidRegex);
    const id = next.url[1].path;
    const isValidID = regex.test(id);
    const isNew = next.url[2].path;
    const canRoute = (isValidID || isNew === 'true');

    if (!canRoute) {
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}
