import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any;
  localData: any = [];
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    this.localData = localStorage.getItem('user');
    this.data = JSON.parse(this.localData);    
  }

  logOut(){
    this.authservice.SignOut();
  }
}
