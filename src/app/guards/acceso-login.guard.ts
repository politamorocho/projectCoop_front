import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AccesoLoginGuard implements CanActivate {

  constructor(private auth : AuthServiceService, private router: Router){

  }
  canActivate(){

    if (this.auth.estaAutenticado() == false) {
      console.log('No estás logueado');
      this.router.navigate(['/login/login']);
      return false;
  }

  return true;

  }
    
  }
  

