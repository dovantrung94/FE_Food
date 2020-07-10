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

    listProduct = [
        {
            id : 1,
            name : "Smoked Ham",
            type : "Products",
            price: 8.53,
            image: "product1.jpg"
        },
        {
            id : 2,
            name : "Sweet Oranges",
            type : "Fresh Fruits, Product",
            price: 8.53,
            image: "product2.jpg"
        },
        {
            id : 3,
            name : "Smoked Ham",
            type : "Products",
            price: 8.53,
            image: "product2.jpg"
        },
        {
            id : 4,
            name : "Smoked Ham",
            type : "Products",
            price: 8.53,
            image: "product1.jpg"
        },
        {
            id : 5,
            name : "Smoked Ham",
            type : "Products",
            price: 8.53,
            image: "product2.jpg"
        },
        {
            id : 6,
            name : "Smoked Ham",
            type : "Products",
            price: 8.53,
            image: "product1.jpg"
        },
        {
            id : 7,
            name : "Smoked Ham",
            type : "Products",
            price: 8.53,
            image: "product2.jpg"
        },
        {
            id : 8,
            name : "Smoked Ham",
            type : "Products",
            price: 8.53,
            image: "product1.jpg"
        },

    ]

    constructor(
        private productService: ProductService,
        public commonServ : CommonService,
        private router: Router,

    ) { }

    ngOnInit(): void {
        this.productService.getProductDetail().subscribe((data: {}) => {
        this.user = data;
        console.log(this.user);
        });
    }

    goDetail() {
        this.router.navigate(['home/detail-product']);
    }

}
