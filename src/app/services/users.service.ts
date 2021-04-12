import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
const AUTH_API = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  currentUser: any;
  todayDate: Date = new Date();
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
    return this.http.get(AUTH_API + 'api/users', httpOptions);
  }
  getnotif(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.get(AUTH_API + 'api/notification', httpOptions);
  }
  set(set): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.post(AUTH_API + 'auth/register', {
     fname : set.fname,
     lname : set.lname,
     username : set.username,
     password : set.password,
     email : set.email,
     position : set.position,
     speciality : set.speciality
    }, httpOptions);

  }
  setnotif(fo: any): Observable<any> {
    const {idUser,  data} = fo;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.post(AUTH_API + 'api/notification', {
     idUser,
     data,
     date: this.todayDate
    }, httpOptions);

  }
  delete(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.delete(AUTH_API + 'api/users/' + id , httpOptions);
  }
  deletenotif(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.delete(AUTH_API + 'api/notification/' + id , httpOptions);
  }

}
