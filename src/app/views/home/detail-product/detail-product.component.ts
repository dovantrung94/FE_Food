import { Product } from './../../../model/product';
import { ProductService } from './../../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss', '../home.component.scss']
})
export class DetailProductComponent implements OnInit {
    
    constructor(
      private router: Router,
      private productService:ProductService
    ) { }
    productDetail : any;
    typeChoose = 1;
    numberProduct = 1;
    listProduct =[];



    ngOnInit(): void {
        this.productService.getProductDetail(4).subscribe(
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

    addToCard () {
        this.router.navigate(['home/pay']);
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
