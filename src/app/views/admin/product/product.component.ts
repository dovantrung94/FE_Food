import { Router } from '@angular/router';
import { ToastService } from './../../../service/toast.service';
import { CategoryService } from './../../../service/category.service';
import { Product } from './../../../model/product';
import { error } from '@angular/compiler/src/util';
import { ProductService } from './../../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  product =new Product();
  categorys=[];
  productFrom : FormGroup;
  submitted = false;
  image:File;
  
  constructor(private productService :ProductService,
    private categoryService :CategoryService,
    private toastService:ToastService,
    private router: Router,
    private fb:FormBuilder
    ) { }

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

    this.productFrom=this.fb.group({
      name:['',Validators.required],
      content:['',Validators.required],
      price:['',Validators.required],
      priceSale:[],
      image:[],
      categoryId:['',Validators.required],
      weight:[''],
      color:[''],
      composition:[''],
      volume:[''],
      description:['',Validators.required]

    })

  }

  get f() { return this.productFrom.controls; }

  onFileChange(event) {
     debugger;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image=file;
    }
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.productFrom.invalid) {
        return;
    }
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
        if(error.status == 401){
          localStorage.removeItem("token");
          localStorage.removeItem("userLogin");
          this.router.navigate['login'];
        }
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
