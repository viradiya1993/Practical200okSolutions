import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
  currentUserLogin: Subject<any> = new Subject();
  constructor(private http: HttpClient, private router: Router) {
    this.currentUser = localStorage.getItem("accessToken");
   }

  // Login User
  login(authData: any) {
    return this.http.post(BACKEND_URL + '/login', authData);
  }
  //User logout
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // get token
  getToken() {
    return localStorage.getItem('accessToken');
  }

  // check token is null or not
  isAuthenticated() {
    let token = this.getToken();
    if (token && token != null) {
      return token;
    } else {
      return null;
    }
   

    return null;
  }

  // for set local storage value
  setLocalStorage(storageKey: any, storageValue: any) {
    localStorage.setItem(storageKey, storageValue);
  }
}
