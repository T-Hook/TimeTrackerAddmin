import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
const AUTH_API = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class PlanService {
  todayDate: Date = new Date();
  currentUser: any;
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
   }
  gettoken(): void {
    this.currentUser = this.tokenStorageService.getUser();
    const t = this.currentUser.token;
    console.log(t);
    return t;
  }
  delete(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.delete(AUTH_API + 'plan/' + id , httpOptions);
  }

  getplans(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.get(AUTH_API + 'plan', httpOptions);
  }
  setplan(set): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.post(AUTH_API + 'plan', {
      name: set.name,
      description: set.description,
      expireIn: set.expireIn,
      data: set.data,
      type: set.type,
      price: set.price
    }, httpOptions);
  }
  addruleplan(idplan: number, idrule: number): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.post(AUTH_API + 'plan/plan/rule/' + idplan + '/' + idrule , {

    }, httpOptions);
  }
}
