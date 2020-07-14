import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categorys=[];

  constructor(private categoryService :CategoryService) { }

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
  }

}
