import { CouponService } from './../../../service/coupon.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  p: number = 1;
  listProduct=[];
  editCoupon: FormGroup;
  constructor(private couponService:CouponService) { }

  ngOnInit(): void {

    this.editCoupon = new FormGroup({
      username: new FormControl(),
      id: new FormControl(),
      password: new FormControl(),
      email: new FormControl()
    });
  }

  createCoupon(){

  }

}
