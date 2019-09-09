import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '../core/storage';

export class BaseService {

  constructor(protected http: HttpClient) { }

  protected static _user: any = undefined;
  protected static _token: string;

  // Properties
  get user(): any {
    if (BaseService._user != null) {
      return BaseService._user;
    } else {
      return Storage.getObject('user');
    }
  }
  set user(user: any) {
    Storage.setObject('user', user);
    BaseService._user = user;
  }

  get token(): string {
    if (BaseService._token != null) {
      return BaseService._token;
    } else {
      return Storage.getOne('token');
    }
  }

  set token(token: string) {
    Storage.setOne('token', token);
    BaseService._token = token;
  }

  getToken() { return Storage.getObject('token'); }
  getUser(): any { return Storage.check('User') ? Storage.getObject('User') : { }; }

  clear_storage() { Storage.clear(); }

  signInCheck() { return Storage.check('token'); }

  //HTTP Requests

  protected authHeader(auth: boolean, formdata:boolean = false) {
    let headers:any = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    if(formdata){ headers = {'Accept': 'application/json'}; }

    if(auth){ headers.Authorization = `Bearer ${this.getToken()}`; }
    return { headers: new HttpHeaders(headers) };
  }

  get(url: string, auth:boolean = true) {
    return this.http.get(url, this.authHeader(auth));
  }

  post(url: string, body: any, auth:boolean = true, formdata:boolean = false) {
    return this.http.post(url, body, this.authHeader(auth, formdata));
  }

  patch(url: string, body: any, auth:boolean = true, formdata:boolean = false) {
    return this.http.patch(url, body, this.authHeader(auth, formdata));
  }

  put(url: string, body: any, auth:boolean = true, formdata:boolean = false) {
    return this.http.put(url, body, this.authHeader(auth, formdata));
  }

  delete(url: string, auth:boolean = true) {
    return this.http.delete(url, this.authHeader(auth));
  }
}
