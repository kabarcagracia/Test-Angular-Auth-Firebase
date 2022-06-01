import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = [];
  userData: any;
  dataUser: any = [];
  constructor(
    public afauth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {

    this.afauth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });

  }
  //logearse con usuario y contraseña
   async login(email:string, password: string) {
      return await this.afauth.signInWithEmailAndPassword(email, password);
  }
  //logearse con google
  async loginWithGoogle(email:string, password: string) {
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch(err) {
      console.log("error login con google", err);
      return null;
    }
  }
  //recuperar contraseña
  async recoverPassword(email:string) {
    try {
      await this.afauth.sendPasswordResetEmail(email);
      return true;
    } catch(err) {
      return null
    }
  }
  // cerrar sesion
  SignOut() {
    return this.afauth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }
  //estado de la sesion
  get isLoggedIn(): any {
    this.dataUser = localStorage.getItem('user');
    let user = JSON.parse(this.dataUser);
    return user;
  }
  async getUser() {
    const user = await this.afauth.currentUser;

    return user;
  }


  async createUser(email: string, password: string){
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch(err) {
      return null;
    }

  }

  async estadoUsuario() {
    try {
      return await this.afauth.onAuthStateChanged((user) => {
          if (user) {
            console.log('estado usuario',user);
            
          } else {
            console.log('no existe');
          } 
        });
    } catch(err) {
      return null;
    }
}
}
