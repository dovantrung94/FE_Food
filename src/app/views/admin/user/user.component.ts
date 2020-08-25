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

  constructor(private userService: UserService,
    private router:Router
    ) {
    this.edit=false;
  }

  ngOnInit(): void {
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
    this.editUser = new FormGroup({
      name: new FormControl(),
      id: new FormControl(),
      pass: new FormControl(),
      email: new FormControl()
    });
  }

  createUser() {
    debugger;
    this.user =Object.assign(this.user,this.editUser.value);
    this.editUser.reset();
    console.log( $('#selectSex').val());
    $('#selectSex').val();
    $('#createUser').modal('hide');
  }
  onSubmit() {

  }
  selectChangeSex(event) {
   this.sex=event.target.value;
  }

  selectChangeRole(event) {
    this.role=event.target.value;
  }

  updateUser(user:any){
    this.edit=true;
    $('#createUser').modal('show');

    this.editUser.setValue({
      name: user.username,
      id: user.id,
      pass:'',
      email: user.email
     });

     $('#selectSex').val(user.sex);
     $('#selectRole').val(user.role);
  }

}
