import { Router } from '@angular/router';

import { error } from '@angular/compiler/src/util';
import { data } from 'jquery';
import { OrderService } from './../../../service/order.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.scss']
})
export class HistoryOrderComponent implements OnInit {
  orderUser = [];
  orderDetail: any;
  constructor(
    private orderService: OrderService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.orderDetail = {};
    this.orderService.getOrderUser().subscribe(data => {
      this.orderUser = data;
    }, error => {
      if(error.status == 401){
        localStorage.removeItem("token");
        localStorage.removeItem("userLogin");
        this.router.navigate['login'];
      }
    })
  }

  reloadHistory() {
    this.orderDetail = {};
    this.orderService.getOrderUser().subscribe(data => {
      this.orderUser = data;
    }, error => {
      if(error.status == 401){
        localStorage.removeItem("token");
        localStorage.removeItem("userLogin");
        this.router.navigate['login'];
      }
    })
  }

  orderDetailOpen(id: number) {
    $('#seenOrderDetail').modal('show');
    this.orderService.getOrderDetail(id).subscribe(data => {
      this.orderDetail = data;
    }, error => {
      if(error.status == 401){
        localStorage.removeItem("token");
        localStorage.removeItem("userLogin");
        this.router.navigate['login'];
      }
    })
  }

  cancelOrder(id: number) {
    this.orderService.cancelOrder(id).subscribe(data => {
      $('#seenOrderDetail').modal('hide');
      this.toastService.showSuccess("Success", "Cancel thành công");
      this.reloadHistory();
    }, error => {
      if (error.status == 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userLogin");
        this.router.navigate['login'];
      }
    })
  }
}
