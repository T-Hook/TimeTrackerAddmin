import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
const AUTH_API = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
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

  get(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.get(AUTH_API + 'project', httpOptions);
  }
  gettasks(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.get(AUTH_API + 'task/' + id , httpOptions);
  }
  getone(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.get(AUTH_API + 'project/' + id , httpOptions);
  }
  update(id: number, set: any): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.put(AUTH_API + 'project/' + id , {
      name: set.name,
      description: set.description,
      data: set.data
    }, httpOptions);
  }
  set(set): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.post(AUTH_API + 'project', {
      name: set.name,
      description: set.description,
      data: set.data,
      idCompany : set.idCompany
    }, httpOptions);
  }
  setuserrolepro(id: number , fo: any): Observable<Object> {
    const {idUser, acl, data} = fo;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    console.log(fo);
    return this.http.post(AUTH_API + 'project/shared' , {
    idProject : id,
    idUser,
   acl, data
    }, httpOptions);
  }
  getuserrolec(id:number): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.get(AUTH_API + 'project/project/shared/' + id , httpOptions);
  }
  delete(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.delete(AUTH_API + 'project/' + id , httpOptions);
  }
  deletetasks(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.delete(AUTH_API + 'task/' + id , httpOptions);
  }
  settask(id: number , ft: any): Observable<Object> {
    const {name, description, type, date, idUser, idProject, idCompany} = ft;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    console.log(ft);
    return this.http.post(AUTH_API + 'task' , {
      name,
      description,
      type,
      date : this.todayDate,
      idUser,
      idProject : id,
      idCompany
    }, httpOptions);
  }

}
