import { Router } from '@angular/router';
import { User } from './../../../model/user';
import { ToastService } from './../../../service/toast.service';
import { error } from '@angular/compiler/src/util';
import { data } from 'jquery';
import { UserService } from './../../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.scss']
})
export class UpdateUserInfoComponent implements OnInit {
  user= new User();
  image:File;
  constructor(
    private userServcie:UserService,
    private toastService:ToastService,
    private router:Router
  ) { }
  sex:any;
  updateProfileForm : FormGroup;

  ngOnInit(): void {
    this.updateProfileForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      address: new FormControl()
    });

    this.userServcie.getUserInfo().subscribe(data=>{
      this.updateProfileForm.setValue({
        username:data.username,
        email:data.email,
        address:data.address
      })
      $('#selectSex').val(data.sex);
      this.url=data.avatarUrl;
    },
    error => {
      this.toastService.showError("Error","Không lấy được thông tin người dùng");
    }
    )
  }
  url:any;
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }

      this.image=event.target.files[0];
    }
  }
  public delete(){
    this.url = null;
  }

  onSubmit() {
    debugger;
    console.log(this.updateProfileForm);
    this.user =Object.assign(this.user,this.updateProfileForm.value);
    this.userServcie.updateUser(this.user,this.image).subscribe(data=>{
      this.toastService.showSuccess("Success","Cập nhật thành công");
      this.router.navigate(['home']);
    },error=>{
      this.toastService.showSuccess("Error","Cập nhật thất bại");
    })


  }

  selectChangeSex(event) {
    this.sex=event.target.value;
   }

}
