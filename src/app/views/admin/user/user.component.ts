import { UserService } from './../../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users=[];

  constructor(private userService:UserService) { 
    
  }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(

      data =>{
        debugger;
        this.users = data;
      },
      error=>{
        console.log(error);
      }
    )
  }


}
