import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuServ: UsuarioService,
               private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return  this.usuServ.validarToken().pipe( 
                tap( estaAut => {
                  if ( !estaAut ) {
                    this.router.navigateByUrl('/login');
                  }
                } ));
  }
}
