import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonService } from '../../../service/common.service';

declare var $: any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login/login.component.scss']
})
export class RegisterComponent implements OnInit {
    dataRegister: FormGroup;
    dataInforUser = {};

    submitted = false;

    notiErr = '';
    constructor(
        private router      : Router,
        private formBuilder : FormBuilder,
        public commonServ   : CommonService,



    ) { }

    ngOnInit(): void {
        // this.dataInforUser = this.commonServ.inforUser;
        // if (this.dataInforUser) {
        //     this.router.navigate(['/home']);
        //     return;
        // }


        this.dataRegister = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(5)]],
            passConfirm: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'passConfirm')
        });
        this.dataRegister.valueChanges.subscribe(data => this.notiErr = '');
    }
    get ckRegister() {
        return this.dataRegister.controls;
    }


    enterRegister(event) {
        if (event.key === "Enter") {
            this.goRegister();
        }
    }

    goRegister() {
      this.submitted = true;

      if (this.dataRegister.invalid) {
          return;
      }

      $(".btn-login").addClass("button-disabled");

      var inforRegister = this.dataRegister.value;
      // this.userServ.register(inforRegister.email, inforRegister.password,this.commonServ.langWeb, data => {
      //     $(".btn-login").removeClass("button-disabled");
      //     console.log(data);
      //     if (data.status == 304) {
      //         this.notiErr = "Tài khoản email đã được sử dụng.";
      //     } else if (data.status == 302) {
      //         this.notiErr = "Có lỗi trong quá trình đăng ký.";
      //     } else if (data.status == 200) {
      //         this.commonServ.alert.notify = "Bạn đã đăng ký tài khoản thành công. Hãy vào địa chỉ mail đăng ký tài khoản này để xác thực tài khoản.";
      //         $('.notify-current-df').fadeIn(200);
      //         setTimeout(function () {
      //             $('.notify-current-df').fadeOut(200);
      //         }, 4000);
      //     }
      // })
  }

}
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
