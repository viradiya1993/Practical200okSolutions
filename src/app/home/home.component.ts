import { Component, OnInit } from '@angular/core';
import { ChunkedData } from '../app.constant';
import { AuthService } from '../_services/auth.service';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  page: any = 1;
  role: any;
  cards: any = [];
  names: ChunkedData<string> = new ChunkedData<string>();
 
  constructor(public auth: AuthService, public shared: SharedService) { this.shared.showLoader();}

  ngOnInit(): void {
    this.auth.currentUserLogin.subscribe((res: any) => {
      this.role = res.role;
    });
    this.assignLoginData();
    this.getAllStudents();
  }

  /* Fetch All student Cards*/
  getAllStudents() {
    this.shared.showLoader();
    const data =  this.shared.getAllStudents(5);
    if (data) {
      this.shared.hideLoader();
      this.names.set(data);
      const rowNames = this.shared.getAllStudents(100);
      const generatedData = rowNames.map(row => ({
        name: row,
        type: Math.floor(Math.random() * 10) > 5 ? 'Case Study' : 'Technical data sheet',
        views: Math.floor(Math.random() * 100),
        impressions: Math.floor(Math.random() * 30),
        downloads: Math.floor(Math.random() * 10),
      }));
    }

  }

 
  /* Show login user name */
  assignLoginData(): void {
    this.role = localStorage.getItem('role');
  }
  loadMore() {
    const data = this.shared.getAllStudents(10);
    this.names.push(data);
  }
}
