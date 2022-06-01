import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {
  dataUser: any;
  data: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {    
    this.dataUser = localStorage.getItem('user');
    this.data = JSON.parse(this.dataUser);
  }

}
