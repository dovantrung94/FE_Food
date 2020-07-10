import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

    constructor() { }

    typeChoose = 1;

    ngOnInit(): void {
    }

    changeChoose(value) {
        this.typeChoose = value;
        $('.choose-item').removeClass('choose-active');
        $('.choose-' + value).addClass('choose-active');

    }

}
