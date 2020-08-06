import { Star } from './../../../model/star';
import { async } from '@angular/core/testing';
import { ProductReview } from './../../../model/product_review';
import { Observable } from 'rxjs';
import { ToastService } from './../../../service/toast.service';
import { CartService } from './../../../service/cart.service';
import { DataService } from './../../../service/data.service';
import { Product } from './../../../model/product';
import { ProductService } from './../../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/model/cart';
import { map, param } from 'jquery';
declare var $: any;

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss', '../home.component.scss']
})
export class DetailProductComponent implements OnInit {
    id:string;
    productDetail:any;
    typeChoose = 1;
    numberProduct = 1;
    listProduct =[];
    productReview=[];
    cart:any;
    idNumber:number;
    voteNumber:number;
    constructor(
      private router: Router,
      private routerActive:ActivatedRoute,
      private productService:ProductService,
      private dataService:DataService,
      private cartService:CartService,
      private toastService:ToastService
    ) { 
      this.cart={};
      this.productDetail={};
      this.dataService.id.subscribe(productId => {
        this.productService.getProductDetail(productId).subscribe(
            data =>{
            
              this.productReview=data.productReviews;
              this.productDetail=data;
              // for (var _i = 0; _i < this.productDetail.productReviews.length; _i++) {
              //   for(let k=0;k<5;k++){
              //     if(k<=this.productDetail.productReviews[_i].vote){
              //       if(k==0){
              //         this.productReview[_i].star1='starHighLight';
              //       }
              //       if(k==1){
              //         this.productReview[_i].star2='starHighLight';
              //       }
              //       if(k==2){
              //         this.productReview[_i].star3='starHighLight';
              //       }
              //       if(k==3){
              //         this.productReview[_i].star4='starHighLight';
              //       }
              //       if(k==4){
              //         this.productReview[_i].star5='starHighLight';
              //       }
              //     }else{
              //       if(k==0){
              //         this.productReview[_i].star1='starNoHighLigh';
              //       }
              //       if(k==1){
              //         this.productReview[_i].star2='starNoHighLigh';
              //       }
              //       if(k==2){
              //         this.productReview[_i].star3='starNoHighLigh';
              //       }
              //       if(k==3){
              //         this.productReview[_i].star4='starNoHighLigh';
              //       }
              //       if(k==4){
              //         this.productReview[_i].star5='starNoHighLigh';
              //       }
              //     }
             
              //   }
            // }
            },
            error=>{
              console.log(error);
            }
          )
          this.productService.getListProduct().subscribe(
            data =>{
              this.listProduct=data;
            },
            error=>{
              console.log(error);
            }
          )
      });
    }
    ngOnInit(): void {
        this.id= this.routerActive.snapshot.paramMap.get('id');
        this.productService.getProductDetail(Number(this.id)).subscribe(
            data =>{
              debugger;
              this.productReview=data.productReviews;
              this.productDetail=data;
           
            //   for (var _i = 0; _i < this.productDetail.productReviews.length; _i++) {

            //     for(let k=0;k<5;k++){
            //       if(k<=this.productDetail.productReviews[_i].vote){
            //         if(k==0){
            //           this.productReview[_i].star1='starHighLight';
            //         }
            //         if(k==1){
            //           this.productReview[_i].star2='starHighLight';
            //         }
            //         if(k==2){
            //           this.productReview[_i].star3='starHighLight';
            //         }
            //         if(k==3){
            //           this.productReview[_i].star4='starHighLight';
            //         }
            //         if(k==4){
            //           this.productReview[_i].star5='starHighLight';
            //         }
            //       }else{
            //         if(k==0){
            //           this.productReview[_i].star1='starNoHighLigh';
            //         }
            //         if(k==1){
            //           this.productReview[_i].star2='starNoHighLigh';
            //         }
            //         if(k==2){
            //           this.productReview[_i].star3='starNoHighLigh';
            //         }
            //         if(k==3){
            //           this.productReview[_i].star4='starNoHighLigh';
            //         }
            //         if(k==4){
            //           this.productReview[_i].star5='starNoHighLigh';
            //         }
            //       }
             
            //     }
            // }
            },
            error=>{
              console.log(error);
            }
          )
          this.productService.getListProduct().subscribe(
            data =>{
              this.listProduct=data;
            },
            error=>{
              console.log(error);
            }
          )
    }

    changeChoose(value) {
        this.typeChoose = value;
        $('.choose-item').removeClass('choose-active');
        $('.choose-' + value).addClass('choose-active');

    }

    addToCard (id) {
        this.cart.productId=id;
        this.cart.quantity=this.numberProduct;
        this.cartService.addProductToCart(this.cart).subscribe(
          data =>{
            this.toastService.showSuccess("Success","Thêm vào giỏ hàng thành công");
            this.dataService.setDropdownValue(""+id);
          },
          error=>{
            this.toastService.showError("Cart","Thêm vào giỏ hàng thất bại");
          }
        )
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

    goDetail(id) {
      this.dataService.changeProductId(id);
      this.router.navigate(['home/detail-product',id]);
  }
  userVote(vote:number){
   this.voteNumber=vote;
  }
  submitComment(){
   let productReview=new  ProductReview();
    productReview.productId=Number(this.routerActive.snapshot.paramMap.get('id'));
    productReview.content=$("#comment").val();  
    productReview.vote=this.voteNumber;
    this.productService.addComment(productReview).subscribe(
      data =>{
        this.toastService.showSuccess("Success","Thêm bình luận thành công");
      },
      error=>{
        this.toastService.showError("Cart","Thêm bình luận thất bại");
      }
    );
  }

}
