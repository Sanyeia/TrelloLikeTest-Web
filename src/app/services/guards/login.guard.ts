import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    public _uS: UserService,
    public router: Router
  ) {}

  canActivate():boolean{
    if( !this._uS.signInCheck() ){
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
