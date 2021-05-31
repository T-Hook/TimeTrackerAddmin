import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { map } from 'rxjs/operators';
const AUTH_API = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  currentUser: any;
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
   }

  gettoken(): void {
    this.currentUser = this.tokenStorageService.getUser();
    const t = this.currentUser.token;
    console.log(t);
    return t;

  }
  get(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.get(AUTH_API + 'trackingsession', httpOptions);
  }
  getAll(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.get(AUTH_API + 'tracking', httpOptions);
  }
  getstat(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.get(AUTH_API + 'tracking/get', httpOptions);
  }

  listByTrackingId(id,parmas) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
    let filter ="";
    Object.keys(parmas).forEach(function(key) {
        var value = parmas[key];
        filter+=key+'='+parmas[key]+'&'
    });

    return this.http.get<any>(AUTH_API +
        `trackingsession/${id}/tracking?${filter}`, httpOptions)
        .pipe(map(trackings => {
            return trackings;
        }));
}

}
