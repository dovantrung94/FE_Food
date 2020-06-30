import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   user :Object
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getProductDetail().subscribe((data: {}) => {
      this.user = data;
      console.log(this.user);
    });
  }

}
