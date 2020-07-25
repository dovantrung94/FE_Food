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
    constructor(
        private productService: ProductService,
        public commonServ : CommonService,
        private router: Router,
        private dataService:DataService
    ) { }

    ngOnInit(): void {
        this.productService.getListProduct().subscribe(
            data =>{
              this.listProduct=data;
            },
            error=>{
              console.log(error);
            }
          )
    }

    goDetail(id) {
      debugger;
        this.dataService.changeProductId(id);
        this.router.navigate(['home/detail-product']);
    }

}
