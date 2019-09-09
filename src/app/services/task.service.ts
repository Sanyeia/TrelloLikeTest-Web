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
export class TaskService extends BaseService{
  private url = {
    create: `${ API_URL }/list/:id/task`,
    search: `${ API_URL }/task/search?q=:search`,
    delete_update: `${ API_URL }/task/:id`,
    assign: `${ API_URL }/task/:id/assign`,
  }

  constructor(
    public http:HttpClient,
    public _nS: NotificationsService
  ) { super(http); }

  public getStatus(status:string){
    switch (status) {
      case "1":
        return 'Open';
        break;
      case "2":
        return 'In-Progress';
        break;
      case "3":
        return 'Completed';
        break;
      case "4":
        return 'Archived';
        break;

      default:
        return 'Other';
        break;
    }
  }

  //task routes
  public search = (search) => {
    return this.get(this.url.search.replace(':search', search));
  }

  public getTask = (id) => {
    return this.get(this.url.delete_update.replace(':id', id));
  }

  public create = (list_id, body: List) => {
    let formData = new HttpParams();

    Object.keys(body).forEach(function(b){
      formData = formData.set(b, body[b]);
    });

    return this.post(this.url.create.replace(':id', list_id), formData)
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

  public assign = (id, user_id) => {
    let formData = new HttpParams();
    formData = formData.set('user_id', user_id);

    return this.put(this.url.assign.replace(':id', id), formData)
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
