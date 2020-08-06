import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { Category } from './../../../model/category';
import { ToastService } from './../../../service/toast.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { data } from 'jquery';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categorys=[];
  category=new Category();
  editCategoryForm: FormGroup;
  constructor(private categoryService :CategoryService,
    private modalService: NgbModal,
    private toastService:ToastService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(
      data =>{
        this.categorys = data;
      },
      error=>{
        if(error.status == 401){
          localStorage.removeItem("token");
          localStorage.removeItem("userLogin");
          this.router.navigate['login'];
        }
      }
    )

    this.editCategoryForm = new FormGroup({
      name: new FormControl(),
      id: new FormControl()
    });
  }
  createCategory(){
    console.log(this.editCategoryForm.value);
    if (this.editCategoryForm.value.name === "")
    {
      this.toastService.showError("Không được bỏ trống name","Category name");
    }else{
      this.category =Object.assign(this.category,this.editCategoryForm.value);
      if(this.editCategoryForm.value.id != null){
        this.categoryService.updateCategory(this.category).subscribe(data=>{
          this.toastService.showSuccess("Success","Update success");
        },error=>{
          this.toastService.showError("Error","Update category fail");
        })
      }else{
        this.categoryService.createCategory(this.category).subscribe(data=>{
          this.toastService.showSuccess("Success","Create success");
        },error=>{
          this.toastService.showError("Error","Create category fail");
        })
      }

    }
  }
  openModal(targetModal, category) {
    debugger;
    $('#createCategory').modal('show');

    this.editCategoryForm.setValue({
      name: category.name,
      id : category.id
     });
  }
}
