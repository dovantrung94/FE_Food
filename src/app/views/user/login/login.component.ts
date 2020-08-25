import { data } from 'jquery';
import { UserService } from './../../../service/user.service';
// import { ToastService } from './../../../service/toast.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../../service/login.service';
import { LocalStorageService } from '../../../service/local-storage.service';
import { ToastService } from 'src/app/service/toast.service';
// import { error } from '@angular/compiler/src/util';


declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    forgetpassowrd: FormGroup;
    dataLogin: FormGroup;
    notiErr = '';
    submitted = false;


    constructor(
        private loginService: LoginService,
        private toastService : ToastService,
        private router: Router,
        private formBuilder : FormBuilder,
        private localServ : LocalStorageService,
        private userService:UserService
    ) { }

    ngOnInit(): void {
        this.forgetpassowrd=this.formBuilder.group({
            'email'     : new FormControl('', [ Validators.required, Validators.email]),
        })
        this.dataLogin = this.formBuilder.group({
            'email'     : new FormControl('', [ Validators.required, Validators.email]),
            'password'  : new FormControl('', [ Validators.required, Validators.minLength(6)])
        });
        this.dataLogin.valueChanges.subscribe(data => this.notiErr = '');
  
    }

    get ckLogin() {
        return this.dataLogin.controls;
    }

    enterLogin(event) {
        if (event.key === "Enter") {
            this.loginWithEmail();
        }
    }

    loginWithEmail() {

        this.submitted = true;

        if (this.dataLogin.invalid) {
            return;
        }
        $(".btn-login").addClass("button-disabled");

        var inforLogin = this.dataLogin.value;

        this.loginService.login(inforLogin.email, inforLogin.password).subscribe(data => {
            debugger;
            console.log(data);
            this.localServ.setItem("userLogin",data.role);
            this.localServ.setItem("token",'Bearer '+ data.token.split(" "));
            if(data.role == "1"){
                this.router.navigate(['admin']);
            }else if(data.role == "0"){
                this.router.navigate(['home']);
            }

        }, err => {
            this.toastService.showError("Login Fail" , "Sai tài khoản hoặc mật khẩu");
        })

    }

    //click button login thì lưu user vào localstorage
    onSubmit() {


    }


    resetPassword() {
        // $('#resetPassword').modal('show');
        
    }
    forgetPassword(){
        this.userService.forgetPassword(this.forgetpassowrd.value.email).subscribe(data=>{
            console.log(data);
        },
        error=>{
            console.log(error);
        })
    }


}
