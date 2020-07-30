import { ToastService } from './../../../service/toast.service';
import { CartService } from './../../../service/cart.service';
import { DataService } from './../../../service/data.service';
import { Product } from './../../../model/product';
import { ProductService } from './../../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart';
declare var $: any;

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss', '../home.component.scss']
})
export class DetailProductComponent implements OnInit {
    id:number;
    constructor(
      private router: Router,
      private productService:ProductService,
      private dataService:DataService,
      private cartService:CartService,
      private toastService:ToastService
    ) { 
      this.dataService.id.subscribe(productId => this.id = productId);
    }
    productDetail : any;
    typeChoose = 1;
    numberProduct = 1;
    listProduct =[];
    cart = new Cart();



    ngOnInit(): void {
        this.productService.getProductDetail(this.id).subscribe(
            data =>{
              debugger;
              this.productDetail=data;
            },
            error=>{
              console.log(error);
            }
          )
          this.productService.getListProduct().subscribe(
            data =>{
              this.listProduct=data;
            },
            error=>{
              console.log(error);
            }
          )
    }

    changeChoose(value) {
        this.typeChoose = value;
        $('.choose-item').removeClass('choose-active');
        $('.choose-' + value).addClass('choose-active');

    }

    addToCard (id) {
        this.cart.productId=id;
        this.cart.quantity=this.numberProduct;
        this.cartService.addProductToCart(this.cart).subscribe(
          data =>{
            this.toastService.showSuccess("Success","Thêm vào giỏ hàng thành công");
            this.dataService.setDropdownValue(""+id);
          },
          error=>{
            this.toastService.showError("Cart","Thêm vào giỏ hàng thất bại");
          }
        )
    }

    changeItem (value) {
        if (value == 'sub') {
            if (this.numberProduct > 1) {
                this.numberProduct --;
            } else {
                this.numberProduct = 1;
            }
        } else {
            this.numberProduct ++;
        }
    }

}
