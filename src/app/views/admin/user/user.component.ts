import { ToastService } from './../../../service/toast.service';
import { error } from '@angular/compiler/src/util';
import { data } from 'jquery';
import { User } from './../../../model/user';
import { UserService } from './../../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users = [];
  editUser: FormGroup;
  edit: boolean;
  user=new User();
  sex:string;
  role:string;
  p: number = 1;

  constructor(private userService: UserService,
    private router:Router,
    private toastService:ToastService
    ) {
    this.edit=false;
  }

  ngOnInit(): void {
    this.loadAll();
    this.editUser = new FormGroup({
      username: new FormControl(),
      id: new FormControl(),
      password: new FormControl(),
      email: new FormControl()
    });
  }

  loadAll(){
    this.userService.getAllUser().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error);
        if(error.status == 401){
          localStorage.removeItem("token");
          localStorage.removeItem("userLogin");
          this.router.navigate['login'];
        }
      }
    )
  }

  createUser() {
    debugger;
    this.user =Object.assign(this.user,this.editUser.value);
    this.editUser.reset();
    console.log( $('#selectSex').val());
   
    $('#createUser').modal('hide');
    this.user.sex=String( $('#selectSex').val());
    this.user.role=String($('#selectRole').val());
    this.userService.createUserByAdmin(this.user).subscribe(data=>{
      this.loadAll();
    },error =>{
      console.log(error);
    })
  }
  onSubmit() {

  }
  selectChangeSex(event) {
   this.sex=event.target.value;
  }

  deleteUser(id:number){
    console.log(id);
    this.userService.deleteUser(id).subscribe(data=>{
      this.toastService.showSuccess("Success","Delete Success");
      this.loadAll();
    },error =>{
      this.toastService.showError("Error","Delete Error");
    })
  }

  selectChangeRole(event) {
    this.role=event.target.value;
  }

  updateUser(user:any){
    this.edit=true;
    $('#createUser').modal('show');

    this.editUser.setValue({
      username: user.username,
      id: user.id,
      password:'',
      email: user.email
     });

     $('#selectSex').val(user.sex);
     $('#selectRole').val(user.role);
  }

}
