import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { CommonService } from 'src/app/service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  listProduct =[];
  p: number = 1;
  pageOfItems: Array<any>;
  constructor( private productService: ProductService,
        public commonServ : CommonService,
        private router: Router) { }

  ngOnInit(): void {
    this.productService.getListProduct().subscribe(
      data =>{
        this.listProduct=data;
      },
      error=>{
        console.log(error);
        if(error.status == 401){
          localStorage.removeItem("token");
          localStorage.removeItem("userLogin");
          this.router.navigate['login'];
        }
      }
    )
  }
  updateProduct(item:any){

  }
  deleteProduct(id:any){

  }

  
}
