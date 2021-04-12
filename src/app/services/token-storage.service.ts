import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  currentUser: any;

  constructor( private router: Router) { }
  signOut(): void {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public getEmail(): string {
    return sessionStorage.getItem(USER_KEY);
  }
  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

 public token(): void {
    this.currentUser = this.getUser();
}

}
