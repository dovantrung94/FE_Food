import { UserService } from '../../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {


  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogin");
    this.router.navigate(['login']);
  }


}
