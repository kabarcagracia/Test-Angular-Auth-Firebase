import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-photo-account',
  templateUrl: './photo-account.component.html',
  styleUrls: ['./photo-account.component.scss']
})
export class PhotoAccountComponent implements OnInit {
  photoOk = false;
  viewLetter = false;


  @Input() photoUrl: string = 'assets/avatar-3.jpg';
  @Input() displayName: string = '';
  @Input() size: string = "50px";

  constructor() { }

  ngOnInit(): void {
  }

  loadingOk(): void {
    this.photoOk = true;

  }
  loadingFailed(): void {
    this.photoOk = false;
    this.photoUrl = 'assets/avatar.png';
  }

  ngOnChanges(changes: any){
    if(changes.photoUrl.currentValue) {
      console.log("currentValue", changes.photoUrl.currentValue);
      this.photoUrl = changes.photoUrl.currentValue;
    } else {
      if(changes.photoUrl.displayName) {
        console.log('viene con el campo');        
      } else {
        console.log("no viene con el campo");
        this.photoUrl = 'assets/avatar-3.jpg';
      }
    }
    if(changes.photoUrl.currentValue != "") {
      console.log("url de imagen cargada"); 
    } else {
      console.log("url de imagen no cargada");
    }
  }
}
