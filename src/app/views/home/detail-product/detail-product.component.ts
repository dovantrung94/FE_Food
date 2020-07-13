import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

    constructor(
      private router: Router
    ) { }

    typeChoose = 1;
    numberProduct = 1;

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
