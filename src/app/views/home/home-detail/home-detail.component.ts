import { error } from '@angular/compiler/src/util';
import { data } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { CommonService } from 'src/app/service/common.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss']
})
export class HomeDetailComponent implements OnInit {
  user :Object
  listProduct =[];
  constructor(
    private productService: ProductService,
    public commonServ : CommonService,
    private router: Router,
    private dataService:DataService
  ) { }

  ngOnInit(): void {
    this.productService.getListProduct().subscribe(
      data =>{
        this.listProduct=data;
      },
      error=>{
        
      }
    )
  }

  filterChanged(value){
    if(value== 'new'){
      this.productService.geListtProductSortNew(1).subscribe(
        data =>{
          this.listProduct=data;
        },
        error => {
          
        }
      )
    }else if(value=='price'){

      this.productService.geListtProductSortNew(2).subscribe(
        data =>{
          this.listProduct=data;
        },
        error => {
          
        }
      )
    }else if(value=='price-desc'){
      this.productService.geListtProductSortNew(3).subscribe(
        data =>{
          this.listProduct=data;
        },
        error => {
          
        }
      )
    }
  }

}
