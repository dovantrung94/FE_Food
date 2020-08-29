import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { data } from 'jquery';
import { ToastService } from './../../../service/toast.service';
import { OrderService } from './../../../service/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders = [];
  p: number = 1;
  constructor(
    private orderService: OrderService,
    private toastService: ToastService,
    private router:Router
  ) { }

  ngOnInit(): void {

      this.orderService.getAllOrderByAdmin().subscribe(
        data => {
          this.orders=data;
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

  updateOrder(order:any){
    debugger;
    if(order.status == 0 ){
      order.status =1;
    }else if(order.status ==1){
      order.status =2;
    }
    this.orderService.updateOrder(order).subscribe(data=>{
      console.log(data);
    },error => {
      console.log(data);
    })
    console.log(order);

  }

}
