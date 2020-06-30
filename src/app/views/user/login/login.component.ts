import { ToastService } from './../../../service/toast.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../../../service/login.service';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup

    constructor(private loginService: LoginService,private toastService :ToastService, private router: Router) { }

    ngOnInit(): void {
      this.loginForm = new FormGroup({
        userName: new FormControl(''),
        password: new FormControl('')
      })
    }

    //click button login thì lưu user vào localstorage
    onSubmit() {
      console.log(this.loginForm.value);
      
      this.loginService.login(this.loginForm.value.userName, this.loginForm.value.password).subscribe(
        data =>{
          
          localStorage.setItem("token",data.token);
          this.router.navigate(['home']);
          
        },
        error =>{
          this.toastService.showError("Đăng nhập không thành công ","Login Fail");
          console.log("Login Fail");
        }
      )

      //lưu data vào localstorage
      // if (this.loginService.login(this.loginForm.value.userName, this.loginForm.value.password)) {
      //   this.router.navigate(['home']);
      // } else {
      //   console.log("Login Fail");
      // }

    }
}
