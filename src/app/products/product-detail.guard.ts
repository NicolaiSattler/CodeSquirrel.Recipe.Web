import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {
 
  private guidRegex = "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"; 
  constructor(private router: Router){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    var regex = new RegExp(this.guidRegex);
    var id = next.url[1].path;
    var isValidID = regex.test(id);
    var isNew = next.url[2].path;
    var canRoute = (isValidID || isNew == 'true');

    if (!canRoute){
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}
