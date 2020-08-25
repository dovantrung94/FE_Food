import { DataService } from './../../service/data.service';
import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    user :Object
    listProduct =[];
    productNew =[];
    productTrending=[];
    constructor(
        private productService: ProductService,
        public commonServ : CommonService,
        private router: Router,
        private dataService:DataService
    ) { }

    ngOnInit(): void {
        this.productService.getProductNewHome().subscribe(
            data =>{
              this.productNew=data;
            },
            error=>{
              if(error.status == 401){
                localStorage.removeItem("token");
                localStorage.removeItem("userLogin");
                this.router.navigate['login'];
              }
            }
          )

          this.productService.getProductTrending().subscribe(
            data =>{
              this.productTrending=data;
            },
            error=>{
              if(error.status == 401){
                localStorage.removeItem("token");
                localStorage.removeItem("userLogin");
                this.router.navigate['login'];
              }
            }
          )
    }

    goDetail(id) {
        this.router.navigate(['home/detail-product',id]);
    }

    readMore(){
      this.router.navigate(['home/home-detail']);
    }
}
