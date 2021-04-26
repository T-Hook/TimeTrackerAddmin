import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
const AUTH_API = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class SprintsService {
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
    return this.http.delete(AUTH_API + 'sprint/' + id , httpOptions);
  }

  getsprints(id:number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.get(AUTH_API + 'sprint/' + id, httpOptions);
  }
  set(id:number,set): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.post(AUTH_API + 'sprint', {
      name: set.name,
      description: set.description,
      type: set.type,
      value: set.value,
      dateStart: set.dateStart,
      dateEnd: set.dateEnd,
      priority: set.priority,
      satuts: set.status,
      idUser: set.idUser,
      idTask: set.idTask,
      idProject: id
    }, httpOptions);
  }
}

