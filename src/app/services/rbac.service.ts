import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
const AUTH_API = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class RbacService {
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
    return this.http.get(AUTH_API + 'rbac', httpOptions);
  }
  getroutes(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.get(AUTH_API + 'rbac/route', httpOptions);
  }
  setroute(route: any): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.post(AUTH_API + 'rbac/route' , {
   name: route.name,
   url : route.url,
   method : route.method,
   active : route.active,
   description : route.description,
   __v: route.__v
    }, httpOptions);
  }
  deleteroute(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.delete(AUTH_API + 'rbac/route/' + id , httpOptions);
  }
  addpermissionrbac(idrbac: number, idpermission: number): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.post(AUTH_API + 'rbac/rbac/permission/' + idrbac + '/' + idpermission , {

    }, httpOptions);
  }
  addrbac(rbac: any): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.post(AUTH_API + 'rbac/' , {
      name : rbac.name,
      description : rbac.description,
      group : rbac.group
    }, httpOptions);
  }
}
