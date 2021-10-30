import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  token: any;
  role: any;
  constructor(public auth: AuthService, public router: Router) { }
  
  ngOnInit() {
    this.auth.currentUserLogin.subscribe((res: any) => {
      this.token = res.accessToken;
      this.role = res.role;
    });
    this.assignLoginData();
  }

  /* Show login user name */
  assignLoginData(): void {
    this.token = localStorage.getItem('authToken');
    this.role = localStorage.getItem('role');
  }

  /* user logout */
  logout() {
    this.auth.logout();
    this.token = null
    localStorage.clear();
    this.router.navigate(['/login']);
    this.auth.currentUserLogin.unsubscribe();
  }
}
