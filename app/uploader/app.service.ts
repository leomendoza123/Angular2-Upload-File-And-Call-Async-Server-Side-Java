
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()


export class StateService{
  constructor(private http: Http) { }
  
  getState(i:any) {
     return Observable.interval(500)
      .switchMap(() => this.http.get('http://localhost:8000/'+i.file.name))
      .map(res => res.json());

  }

  dowload(i:any) {
    i.downloadUrl = 'http://localhost:8000/dl/'+i.file.name;
  }

}