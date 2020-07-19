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
      private router: Router
    ) { }

    typeChoose = 1;
    numberProduct = 1;

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


    ngOnInit(): void {
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
