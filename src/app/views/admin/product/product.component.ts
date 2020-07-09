import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productFrom : FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    this.productFrom = new FormGroup({
      productName: new FormControl(),
      description: new FormControl(),
        price: new FormControl(),
     priceSale: new FormControl(),
      image: new FormControl()
    });
  }


  onFileChange(event) {
    const reader = new FileReader();
    debugger;
    if(event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.productFrom.get('image').setValue(file);
    }
  }


  onSubmit() {
    console.log(this.productFrom);
  }


}
