import { OrderService } from './../../../service/order.service';
import { ToastService } from './../../../service/toast.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  reports = [];
  p: number = 1;
  constructor(private orderService: OrderService,
    private toastService: ToastService,
    private router:Router) { }

  ngOnInit(): void {
    this.orderService.getReport().subscribe(
      data => {
        this.reports=data;
      },
      error =>{
        this.toastService.showError("Error","Get List Order Fail");
        if(error.status == 401){
          localStorage.removeItem("token");
          localStorage.removeItem("userLogin");
          this.router.navigate['login'];
        }
      }
    )

    
  }

}
