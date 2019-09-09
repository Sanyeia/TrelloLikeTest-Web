import { NotificationsService } from './notifications.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from '../core/constants';
import { BaseService } from './base.service';
import { User } from '../interfaces/interfaces';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private url = {
    index: `${ API_URL }/user`,
    login: `${ API_URL }/login`,
    create_user: `${ API_URL }/register`,
    update_user: `${ API_URL }/user/:id`,
  }

  constructor(
    public http:HttpClient,
    public _nS: NotificationsService
  ) { super(http); }

  public logout = () => {
    return this.clear_storage();
  }

  //user routes
  public search = (search:string) => {
    return this.get(this.url.index.replace(':search', search)+'?search='+search);
  }

  public index = () => {
    return this.get(this.url.index);
  }

  public login = (body) => {
    let formData = new HttpParams();
    Object.keys(body).forEach(function(b){
      formData = formData.set(b, body[b]);
    });

    return this.post(this.url.login, formData, false).pipe(
      map((resp: any) => {
        this.token = resp.token;
        this.user = resp.data;
      return resp.data;
      }),
      catchError(err => {
        if(err.status == 401){
          this._nS.show('Invalid Credentials', '', 'error');
        }
        return throwError(err);
      })
    );
  }

  public create = (body: User) => {
    let formData = new FormData();
    Object.keys(body).forEach(function(b){
      if(b == 'firstname' || b == 'lastname'){
        formData.append('name['+b+']', body[b]);
      }else{
        formData.append(b, body[b]);
      }
    });

    return this.post(this.url.create_user, formData, false, true).pipe(
      map((resp: any) => {

      this._nS.show('Registered Successfully', 'Now please log in', 'success');
      return resp.data;
    }));
  }

  public update = (body: User) => {
    let formData = new FormData();
    Object.keys(body).forEach(function(b){
      if(b == 'firstname' || b == 'lastname'){
        formData.append('name['+b+']', body[b]);
      }else{
        formData.append(b, body[b]);
      }
    });

    return this.put(this.url.update_user, formData, true, true);
  }
}
