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
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {

    dataForgetPassword: FormGroup;
    notiErr = '';
    submitted = false;
    constructor(
        private loginService: LoginService,
        private toastService : ToastService,
        private router: Router,
        private formBuilder : FormBuilder,
        private localServ : LocalStorageService
    ) { }

    ngOnInit(): void {
        this.dataForgetPassword = this.formBuilder.group({
            'email'     : new FormControl('', [ Validators.required, Validators.email]),
            'password'  : new FormControl('', [ Validators.required, Validators.minLength(6)])
        });
        this.dataForgetPassword.valueChanges.subscribe(data => this.notiErr = '');
    }

    get ckLogin() {
        return this.dataForgetPassword.controls;
    }

    enterLogin(event) {
        if (event.key === "Enter") {
            this.loginWithEmail();
        }
    }

    get ckRegister() {
        return this.dataForgetPassword.controls;
    }


    loginWithEmail() {

        this.submitted = true;

        if (this.dataForgetPassword.invalid) {
            return;
        }
        // $(".btn-login").addClass("button-disabled");

        // var inforLogin = this.dataForgetPassword.value;

        // this.loginService.login(inforLogin.email, inforLogin.password).subscribe(data => {
        //     debugger;
        //     console.log(data);
        //     this.localServ.setItem("userLogin",data.role);
        //     this.localServ.setItem("token",'Bearer '+ data.token.split(" "));
        //     if(data.role == "1"){
        //         this.router.navigate(['admin']);
        //     }else if(data.role == "0"){
        //         this.router.navigate(['home']);
        //     }

        // }, err => {
        //     this.toastService.showError("Login Fail" , "Sai tài khoản hoặc mật khẩu");
        // })

    }

    //click button login thì lưu user vào localstorage
    onSubmit() {

    }


}
