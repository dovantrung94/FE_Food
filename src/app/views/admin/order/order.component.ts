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
  constructor(
    private orderService: OrderService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
      this.orderService.getAllOrderByAdmin().subscribe(
        data => {
          this.orders=data
        },
        error =>{
          this.toastService.showError("Error","Get List Order Fail");
        }
      )
  }

}
