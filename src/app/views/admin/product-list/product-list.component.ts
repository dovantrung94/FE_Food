import { ToastService } from 'src/app/service/toast.service';
import { error } from '@angular/compiler/src/util';
import { data } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { CommonService } from 'src/app/service/common.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  listProduct = [];
  p: number = 1;
  editProduct: FormGroup;
  product =new Product();
  // categorys=[];
  constructor(private productService: ProductService,
    public commonServ: CommonService,
    private fb: FormBuilder,
    private toastServcie:ToastService,
    private router: Router) { }

  ngOnInit(): void {
    this.editProduct = this.fb.group({
      productDetailId:[''],
      productname:['',Validators.required],
      description:['',Validators.required],
      content:['',Validators.required],
      price:['',Validators.required],
      pricesale:['',Validators.required]
    })
    this.loadAll();
  }

  loadAll(){
    this.productService.getListProduct().subscribe(
      data => {
        debugger;
        this.listProduct = data;
      },
      error => {
        console.log(error);
        if (error.status == 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userLogin");
          this.router.navigate['login'];
        }
      }
    )
  }
  updateProduct(item: any) {
    $('#updateProduct').modal('show');
    //call lên server lấy full thông tin sản phẩm về để update 
    this.productService.getProductDetail(item.id).subscribe(data=>{
      debugger;
      this.editProduct.setValue({
        productDetailId:data.productDetailId,
        productname:data.name,
        description:data.description,
        content:data.content,
        price:data.price,
        pricesale:data.priceSale
      })
    },error =>{

    })

  }
  updateProductSave() {
    debugger;
    this.product =Object.assign(this.product,this.editProduct.value);
    this.productService.updateProduct(this.product).subscribe(data=>{
      $('#updateProduct').modal('hide');
      this.toastServcie.showSuccess("Success","Update success");
      this.loadAll();
    },error=>{

    })
  }
  deleteProduct(id: number,productDetailId:number) {
    this.productService.deleteProduct(id,productDetailId).subscribe(data=>{
      this.toastServcie.showSuccess("Success","Delete success");
      this.loadAll();
    },error =>{

    })
  }


}
