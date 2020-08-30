import { ToastService } from './../../../service/toast.service';
import { error } from '@angular/compiler/src/util';
import { data } from 'jquery';
import { UserService } from './../../../service/user.service';
import { User } from './../../../model/user';
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
        private router: Router,
        private formBuilder: FormBuilder,
        public commonServ: CommonService,
        private userService: UserService,
        private toastService: ToastService

    ) { }

    ngOnInit(): void {
        this.dataRegister = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(5)]],
            passConfirm: ['', Validators.required],
            sex: ['', Validators.required],
            address: ['', Validators.required]
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
        let user = new User;
        debugger;
        user.username = this.dataRegister.value.name;
        user.password = this.dataRegister.value.password;
        user.sex = this.dataRegister.value.sex;
        user.role = '0';
        user.email = this.dataRegister.value.email;
        user.address = this.dataRegister.value.address;
        this.userService.createUserByGuest(user).subscribe(data => {
            this.toastService.showSuccess("Success", "Đăng kí thành công");
            this.router.navigate(['login']);
        }, error => {
            if(error.error.statusRegister ==2 ){
                this.toastService.showError("Email", "Email đã tồn tại");
            }else{
                this.toastService.showError("Email", "Đăng kí không thành công");
            }
        })
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
