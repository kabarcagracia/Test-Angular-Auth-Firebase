import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    response: any;
    viewPassword = false;
    checkCredentials = false;
    viewMessageErrorData = false;
    recoverPassword = false;
    sendRecoverPassword = false;
    loginForm = new FormGroup({
        email: new FormControl('', [
            Validators.required, 
            Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
    ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ])
    });

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onSubmit(): void {
        this.checkCredentials  = !this.checkCredentials;
        if(this.loginForm.valid) {
            this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then(res =>{
                if(res != null) {
                    this.response = res;
                    localStorage.setItem('user', JSON.stringify(this.response.user));
                    this.router.navigate(['dashboard']);
                } else {
                    this.loginForm.setValue({
                        email: this.loginForm.value.email,
                        password: ''
                    });
                    this.checkCredentials = false;   
                    this.viewMessageErrorData = true;
                }
            }).catch((error) =>{
                //console.warn(error);
            });   
        } else {
            this.checkCredentials = false;
        } 
    }

    loginWithGoogle(): void{
        this.authService.loginWithGoogle(this.loginForm.value.email, this.loginForm.value.password).then(res =>{
            if(res != null) {
                this.response = res;
                localStorage.setItem('user', JSON.stringify(this.response.user));
                if(this.response.additionalUserInfo.isNewUser) {
                    //si es nuevo se debe agregar la info a la db.
                }
                if(!this.response.user.emailVerified){
                    //el email no esta identificado deberia enviar un correo para que se verifique la cuenta.
                }
                this.router.navigate(['dashboard/inicio']);
            } else {
                this.loginForm.setValue({
                    email: this.loginForm.value.email,
                    password: ''
                });
                this.checkCredentials = false;   
                this.viewMessageErrorData = true;
            }
        }).catch((err) => {
        //console.warn(err.response);
        });
    }

    recoveryPwd(): void {
        if(this.loginForm.value.email != '') {
            this.authService.recoverPassword(this.loginForm.value.email).then(res =>{
                this.recoverPassword = false;
                this.sendRecoverPassword = true;
            });
        } else {
            this.recoverPassword = true;
        }
    }

    toggleViewPwd(){
        this.viewPassword = !this.viewPassword;
    }
    
    ngOnInit(): void {
        if(localStorage.getItem('user')) {
            this.router.navigate(['dashboard']);
        }
    }
}
