import { User } from './../../model/user';
import { UserService } from './../../service/user.service';
import { CartService } from './../../service/cart.service';
import { DataService } from './../../service/data.service';
import { ToastService } from './../../service/toast.service';
import { error } from '@angular/compiler/src/util';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchKeyword: string;
  showResult = false;
  noDataResult = false;
  showUser = false;
  productSearch: [];
  user = new User();
  cart: any;
  listCartItem = [];
  constructor(private router: Router,
    private productService: ProductService,
    private toastService: ToastService,
    private dataService: DataService,
    private cartService: CartService,
    private userService: UserService
  ) {
    this.cart = {};
    this.dataService.getDropdownValue().subscribe((newValue) => {
      this.cartService.getCart().subscribe(data => {
        this.cart = data;
        this.listCartItem = data.cartItems;
      },
        error => {
          console.log(error);
          if (error.status == 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("userLogin");
            this.router.navigate['login'];
          }
        }
      )
    });
    this.dataService.getcartValue().subscribe((newCart) => {
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
    });

  }

  ngOnInit(): void {
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

    if (localStorage.getItem("userLogin") != undefined) {
      this.showUser = true;
    }
    this.userService.getUserInfo().subscribe(data => {
      this.user = data;
    },
      error => {
        if(error.status == 401){
          localStorage.removeItem("token");
          localStorage.removeItem("userLogin");
          this.router.navigate['login'];
        }
      })

  }

  foodMarket() {
    this.router.navigate(['home']);
  }

  onFocus() {
    if (this.productSearch != undefined && this.productSearch.length > 0) {
      this.showResult = true;
    }

  }

  onFocusOutEvent() {
    setTimeout(() => {
      this.showResult = false;
    }, 200);

  }
  searchChangeEvent(data: any) {
    console.log(this.searchKeyword);
    this.productService.searchProduct(this.searchKeyword).subscribe(data => {
      debugger;
      this.showResult = true;
      this.productSearch = data;
      if (data.length == 0) {
        this.noDataResult = true;
      } else {
        this.noDataResult = false;
      }
    },
      error => {
        this.toastService.showError("Error", "Tìm kiếm lỗi");
      }
    )
  }

  goDetailProduct(id) {
    // debugger;
    // this.dataService.changeProductId(id);
    // this.router.navigate(['home/detail-product']);
    this.router.navigate(['home/detail-product', id]);

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

  viewCart() {
    this.router.navigate(['home/pay']);
  }

  checkOut() {
    this.router.navigate(['home/confirm']);
  }

  updateInfo() {
    this.router.navigate(['home/user-info']);
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogin");
    this.router.navigate(['login']);
  }

  historyOrder() {
    this.router.navigate(['home/history']);
  }
  singUp(){
    this.router.navigate(['register']);
  }
  logIn(){
    this.router.navigate(['login']);
  }
}
