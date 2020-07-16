import { CategoryService } from './../../../service/category.service';
import { Product } from './../../../model/product';
import { error } from '@angular/compiler/src/util';
import { ProductService } from './../../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product =new Product();
  categorys=[];
  productFrom : FormGroup;
  
  constructor(private productService :ProductService,private categoryService :CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(

      data =>{
        debugger;
        this.categorys = data;
      },
      error=>{
        console.log(error);
      }
    )
    this.productFrom = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      price: new FormControl(),
      priceSale: new FormControl(),
      image: new FormControl(),
      categoryId: new FormControl()
    });
  }


  // onFileChange(event) {
  //   const reader = new FileReader();
  //   debugger;
  //   if(event.target.files && event.target.files.length) {
  //     const file = event.target.files[0];
  //     this.productFrom.get('image').setValue(file);
  //   }
  // }

  onFileChange(event) {
     debugger;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productFrom.patchValue({
        image: file
      });
    }
  }

  onSubmit() {
    console.log(this.productFrom);
    debugger;
    this.product =Object.assign(this.product,this.productFrom.value);
    this.productService.createProduct(this.product).subscribe(
      data =>{
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }


}
