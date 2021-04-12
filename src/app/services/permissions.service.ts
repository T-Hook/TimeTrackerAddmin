import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
const AUTH_API = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

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
    return this.http.get(AUTH_API + 'rbac/permission', httpOptions);
  }
  setpermission(permission: any): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.post(AUTH_API + 'rbac/permission' , {
      name : permission.name,
      description : permission.description
    }, httpOptions);
  }
  deleteper(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.delete(AUTH_API + 'rbac/permission/' + id , httpOptions);
  }
  setpermissionroute(per: number, per1: number): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.put(AUTH_API + 'rbac/permission/route/' + per + '/' + per1 , {

    }, httpOptions);
  }
}

