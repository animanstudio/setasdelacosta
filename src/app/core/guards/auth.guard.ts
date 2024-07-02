import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAuthenticatedUser()) {
      return true; // Permitir acceso a la ruta protegida si el usuario está autenticado
    } else {
      // Redirigir al usuario a la página de inicio de sesión
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }
  }
  
}
