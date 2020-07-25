import { ToastService } from './../../../service/toast.service';
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

  image:File;
  
  constructor(private productService :ProductService,private categoryService :CategoryService,private toastService:ToastService) { }

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
      content: new FormControl(),
      price: new FormControl(),
      priceSale: new FormControl(),
      image: new FormControl(),
      categoryId: new FormControl(),
      weight: new FormControl(),
      color:new FormControl(),
      composition:new FormControl(),
      volume:new FormControl(),
      description:new FormControl()
    });
  }

  onFileChange(event) {
     debugger;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image=file;
    }
  }

  onSubmit() {
    debugger;
    console.log(this.productFrom);
    this.product =Object.assign(this.product,this.productFrom.value);
    this.productService.uploadProduct(this.product,this.image).subscribe(
      data =>{
        debugger;
        console.log(data);
      },
      error=>{
        this.toastService.showError("Image","Upload image Error");
      }
    )

    // this.productService.createProduct(this.product).subscribe(
    //   data =>{
    //     debugger;
    //     console.log(data);
    //   },
    //   error=>{
    //     console.log(error);
    //   }
    // )
  }


}
