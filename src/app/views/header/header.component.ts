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
  productSearch: [];
  cart: any;
  listCartItem = [];
  constructor(private router: Router,
    private productService: ProductService,
    private toastService: ToastService,
    private dataService: DataService,
    private cartService: CartService
  ) {
    this.cart={};
    this.dataService.getDropdownValue().subscribe((newValue) => {
      this.cartService.getCart().subscribe(data => {
        this.cart = data;
        this.listCartItem = data.cartItems;
      },
        error => {
          console.log(error);
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
      }
    )
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
    }, 100);

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
    debugger;
    this.dataService.changeProductId(id);
    this.router.navigate(['home/detail-product']);

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
      }
    )
  }

  viewCart() {
    this.router.navigate(['home/pay']);
  }

  checkOut() {
    this.router.navigate(['home/confirm']);
  }
}
