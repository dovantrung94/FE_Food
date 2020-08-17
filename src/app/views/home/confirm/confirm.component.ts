import { CartService } from './../../../service/cart.service';
import { UserService } from './../../../service/user.service';
import { DataService } from 'src/app/service/data.service';
import { Order } from './../../../model/order';
import { ToastService } from './../../../service/toast.service';
import { error } from '@angular/compiler/src/util';
import { data } from 'jquery';
import { OrderService } from './../../../service/order.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;


@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

    dataConfirm: FormGroup;
    notiErr = '';
    submitted = false;
    order = new Order();
    cart: any;
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private orderService: OrderService,
        private toastService: ToastService,
        private dataService: DataService,
        private userService: UserService,
        private cartService:CartService
    ) { }

    ngOnInit(): void {
        this.cart = {};
        this.dataConfirm = this.formBuilder.group({
            'name': new FormControl('', [Validators.required]),
            'phone': new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^[0-9]\d*$/)]),
            'address': new FormControl('', [Validators.required]),
            'email': new FormControl('', [Validators.required, Validators.email]),
        });
        this.dataConfirm.valueChanges.subscribe(data => this.notiErr = '');
        this.userService.getUserInfo().subscribe(data => {
            debugger;
            this.dataConfirm.setValue({
                'name':data.username,
                'address':data.address,
                'email':data.email,
                'phone':''
            })
        }, error => {
            if (error.status == 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userLogin");
                this.router.navigate['login'];
            }
        })
        this.cartService.getCart().subscribe(data => {
            this.cart = data;
          },
            error => {
              console.log(error);
              if(error.status == 401){
                localStorage.removeItem("token");
                localStorage.removeItem("userLogin");
                this.router.navigate['login'];
              }
            }
          )

    }
    get ckConfirm() {
        return this.dataConfirm.controls;
    }

    confirm() {
        this.submitted = true;
        this.order = Object.assign(this.order, this.dataConfirm.value);
        this.orderService.paymentCart(this.order).subscribe(data => {
            //đặt hàng thành công thì chuyển về trang lịch sử mua hàng 
            this.toastService.showSuccess("success", "Đặt hàng thành công");
            this.router.navigate(['home/history']);
            this.dataService.setcartValue("" + this.order);
        },
            error => {
                if (error.status == 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userLogin");
                    this.router.navigate['login'];
                }
            }
        )
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
