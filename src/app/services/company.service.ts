import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
const AUTH_API = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
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
    return this.http.get(AUTH_API + 'company' + '/admin', httpOptions);
  }
  getrule(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.get(AUTH_API + 'rule', httpOptions);
  }
  getone(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.get(AUTH_API + 'company/admin/' + id , httpOptions);
  }
  update(id: number, set: any): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.put(AUTH_API + 'company/admin/' + id , {
      name: set.name,
      address: set.address,
      region: set.region,
      description: set.description,
      phone: set.phone,
      website: set.website
    }, httpOptions);
  }
  set(set): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.post(AUTH_API + 'company', {
      name: set.name,
      address: set.address,
      region: set.region,
      description: set.description,
      phone: set.phone,
      website: set.website
    }, httpOptions);
  }
  setuserrole(id: number, fo: any): Observable<Object> {
    const {idUser, acl, data} = fo;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    console.log(fo);
    return this.http.put(AUTH_API + 'company/' + id + '/user/role' , {
    idCompany: id,
    idUser,
   acl, data
    }, httpOptions);
  }
  setrule(id: number, rule: any): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.post(AUTH_API + 'rule' , {
    name : rule.name,
    type: rule.type,
    description : rule.description,
    value : rule.value,
    idCompany: id
    }, httpOptions);
  }
  deleterule(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.delete(AUTH_API + 'rule/' + id , httpOptions);
  }
  getuserrolec(id: number): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.get(AUTH_API + 'company/' + id + '/user/role', httpOptions);
  }

}

