import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const id = +next.paramMap.get('id');  // next.url[1].path
        if (isNaN(id) || id < 1) {
            alert('Invalid product id:' + id);
            this.router.navigate(['products']);
            return false;
        }
        return true;
    }
}
