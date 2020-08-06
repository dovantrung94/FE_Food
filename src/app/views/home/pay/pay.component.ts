import { error } from '@angular/compiler/src/util';
import { CartService } from './../../../service/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
        private cartService:CartService
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

}
