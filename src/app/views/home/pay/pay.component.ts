import { data } from 'jquery';
import { CouponService } from './../../../service/coupon.service';
import { error } from '@angular/compiler/src/util';
import { CartService } from './../../../service/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
    selector: 'app-pay',
    templateUrl: './pay.component.html',
    styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
    cart:any;
    listCartItem=[];
    
    constructor(
        private router: Router,
        private cartService:CartService,
        private toastService: ToastService,
        private localServ : LocalStorageService,
        private couponService:CouponService
    ) {
        this.cart={};
     }

    ngOnInit(): void {
        this.cartService.getCart().subscribe(data=>{
            this.cart=data;
            this.listCartItem = data.cartItems;
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

    goToConfirm () {
        this.router.navigate(['home/confirm']);
    }

    changeNumber (value) {
      if (value == 'add') {

      } else {

      }
    }

    applyCoupon(){
     let coupon= $('#couponCode').val();
      //lay value cua coupon 
      //goi service kiem tra
      this.couponService.checkCoupon(coupon).subscribe(data=>{
        debugger;
        this.toastService.showSuccess("Success","Add Coupon success");
        this.localServ.setItem("coupon",coupon);
        this.localServ.setItem("money",data.money);
        //set vao roi thi tru tien di 
        this.cart.totalPrice=this.cart.totalPrice - data.money;
      },error =>{
        this.toastService.showError("Error","Coupon không chính xác");
      })
      // this.localServ.setItem("coupon",coupon);

    }

    deleteItemCart(cartItem: any) {
        debugger;
        console.log(cartItem);
        this.cartService.deleteItemInCart(cartItem.id).subscribe(
          data => {
            this.updateCart();
          },
          error => {
            this.toastService.showError("Error", "Xóa không thành công");
            if(error.status == 401){
              localStorage.removeItem("token");
              localStorage.removeItem("userLogin");
              this.router.navigate['login'];
            }
          }
        )
      }

      updateCart() {
        this.cartService.getCart().subscribe(data => {
          this.cart = data;
          this.listCartItem = data.cartItems;
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

}
