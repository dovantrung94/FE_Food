import { data } from 'jquery';
import { UserService } from './../../../service/user.service';
import { ActivatedRoute } from '@angular/router';
// import { ToastService } from './../../../service/toast.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../../service/login.service';
import { LocalStorageService } from '../../../service/local-storage.service';
import { ToastService } from 'src/app/service/toast.service';
import { Route } from '@angular/compiler/src/core';
import { MustMatch } from '../../home/confirm/confirm.component';
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
    token:string;
    constructor(
        private loginService: LoginService,
        private toastService : ToastService,
        private router: Router,
        private activeRouter:ActivatedRoute,
        private formBuilder : FormBuilder,
        private localServ : LocalStorageService,
        private userService:UserService
    ) { }

    ngOnInit(): void {
        
        this.token=this.router.url.replace('/forgot?token=','');
        this.dataForgetPassword = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(5)]],
            passConfirm: ['', Validators.required],
        }, {
            validator: MustMatch('password', 'passConfirm')
        });
        this.dataForgetPassword.valueChanges.subscribe(data => this.notiErr = '');
    }

    get ckRegister() {
        return this.dataForgetPassword.controls;
    }


    get ckLogin() {
        return this.dataForgetPassword.controls;
    }

    enterLogin(event) {
        if (event.key === "Enter") {
            this.loginWithEmail();
        }
    }


    loginWithEmail() {

        this.submitted = true;

        if (this.dataForgetPassword.invalid) {
            return;
        }
        let pass= this.dataForgetPassword.value.password;
        let passConfirm=this.dataForgetPassword.value.passConfirm;
        this.userService.resetPassword(pass,this.token).subscribe(data=>{
            debugger;
            this.toastService.showSuccess("Success","Cập nhật mật khẩu thành công");
            this.router.navigate(['login']);
        },error =>{
            
        })
    }

    onSubmit() {

    }


}
