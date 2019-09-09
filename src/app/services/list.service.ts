import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from './../core/constants';
import { BaseService } from './base.service';
import { NotificationsService } from './notifications.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { List } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ListService extends BaseService {
  private url = {
    base: `${ API_URL }/list`,
    delete_update: `${ API_URL }/list/:id`,
  }

  constructor(
    public http:HttpClient,
    public _nS: NotificationsService
  ) { super(http); }

  //list routes
  public index = () => {
    return this.get(this.url.base);
  }

  public create = (body: List) => {
    let formData = new HttpParams();

    Object.keys(body).forEach(function(b){
      formData = formData.set(b, body[b]);
    });

    return this.post(this.url.base, formData)
    .pipe(catchError(err => {
      this._nS.show('Something went wrong', 'Please try again later', 'error');
      return throwError(err);
    }));
  }

  public update = (id, body: List) => {
    let formData = new HttpParams();

    Object.keys(body).forEach(function(b){
      formData = formData.set(b, body[b]);
    });

    return this.put(this.url.delete_update.replace(':id', id), formData)
    .pipe(catchError(err => {
      this._nS.show('Something went wrong', 'Please try again later', 'error');
      return throwError(err);
    }));
  }

  public remove = (id) => {
    return this.delete(this.url.delete_update.replace(':id', id))
    .pipe(catchError(err => {
      this._nS.show('Something went wrong', 'Please try again later', 'error');
      return throwError(err);
    }));
  }

}
