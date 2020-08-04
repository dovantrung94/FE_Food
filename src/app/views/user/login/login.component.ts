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

    dataLogin: FormGroup;
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
    //   console.log(this.loginForm.value);

    //   this.loginService.login(this.loginForm.value.userName, this.loginForm.value.password).subscribe(
    //     data =>{

    //       localStorage.setItem("token",data.token);
    //       this.router.navigate(['home']);

    //     },
    //     error =>{
    //       this.toastService.showError("Đăng nhập không thành công ","Login Fail");
    //       console.log("Login Fail");
    //     }
    //   )

    }

    // dataLogin: FormGroup;
    // notiErr = '';

    // submitted = false;

    // dataInforUser = {};

    // constructor(
    //     // public commonServ   : CommonService,
    //     private router      : Router,
    //     private formBuilder : FormBuilder,
    //     // private userServ    : UserService,
    //     // private encryptionServ : EncryptionService,
    //     // private cookieServ  : CookieService,
    //     // private localServ   : LocalStorageService,
    //     // private broadcaster : BroadcasterService,
    //     // private authService : AuthService,
    //     private loginService : LoginService
    // ) { }

    // ngOnInit() {
    //     // scroll top
    //     window.scroll({
    //         top: 0,
    //         left: 0,
    //         behavior: 'smooth'
    //     });

    //     // this.commonServ.loginSocial = false;

    //     // this.dataInforUser = this.commonServ.inforUser;
    //     // if (this.dataInforUser) {
    //     //     this.router.navigate(['/home']);
    //     //     return;
    //     // }

    //     // this.broadcaster.on('login-success').subscribe(() => {
    //     //     this.dataInforUser = this.commonServ.inforUser;

    //     //     if (this.dataInforUser) {
    //     //         this.router.navigate(['/home']);
    //     //         return;
    //     //     }
    //     // });

    //     this.dataLogin = this.formBuilder.group({
    //         'email'     : new FormControl('', [ Validators.required, Validators.email]),
    //         'password'  : new FormControl('', [ Validators.required, Validators.minLength(6)])
    //     });
    //     this.dataLogin.valueChanges.subscribe(data => this.notiErr = '');
    // }

    // get ckLogin() {
    //     return this.dataLogin.controls;
    // }

    // loginSuccess(value) {
    //     if (value.status == 302) {
    //         this.notiErr = "Tài khoản chưa được kích hoạt";
    //     } else if (value.status == 200) {
    //         this.commonServ.alert.notify = "Đăng nhập thành công";

    //         var tokenId = value.result.tokenId;
    //         tokenId = this.encryptionServ.encode(tokenId);
    //         this.cookieServ.setCookie('tokenId', tokenId);

    //         $('.notify-current-df').fadeIn(200);
    //         setTimeout(() => {
    //             $('.notify-current-df').fadeOut(200);
    //         }, 500);

    //         var idUser = value.result.userId;
    //         this.localServ.setItem('idUser', idUser);
    //         this.commonServ.inforUser = value.result;

    //         this.broadcaster.broadcast('login-success');
    //         this.router.navigate(['/home']);
    //     } else {
    //         this.notiErr = "Tài khoản hoặc mật khẩu không đúng";
    //     }

    // }

    // loginWithEmail() {

    //     this.submitted = true;

    //     if (this.dataLogin.invalid) {
    //         return;
    //     }
    //     $(".btn-login").addClass("button-disabled");

    //     var inforLogin = this.dataLogin.value;
    //     this.userServ.login(inforLogin.email, inforLogin.password, (res) => {
    //         $(".btn-login").removeClass("button-disabled");

    //         this.loginSuccess(res);
    //     });

    // }

    // enterLogin(event) {
    //     if (event.key === "Enter") {
    //         this.loginWithEmail();
    //     }
    // }

    resetPassword() {
        // $('#resetPassword').modal('show');
    }



}
